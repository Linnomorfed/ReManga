import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookmarksEntity } from 'src/bookmarks/entities/bookmark.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { FilesService } from 'src/files/files.service';
import { GenresService } from 'src/genres/genres.service';
import { RatingEntity } from 'src/rating/entities/rating.entity';
import { getRepository, Repository } from 'typeorm';
import { CreateMangaDto } from './dto/create-manga.dto';
import { SearchMangaDto } from './dto/search-manga.dto';
import { UpdateMangaDto } from './dto/update-manga.dto';
import { MangaEntity } from './entities/manga.entity';
import { SortByEnum } from './enums/sortby';

@Injectable()
export class MangaService {
  constructor(
    @InjectRepository(MangaEntity)
    private repository: Repository<MangaEntity>,
    private filesService: FilesService,
    private genresService: GenresService,
    private categoriesService: CategoriesService,
  ) {}

  async create(dto: CreateMangaDto, genres, categories) {
    return this.repository.save({
      title: dto.title,
      otherTitles: dto.otherTitles,
      blocks: dto.blocks,
      issueYear: dto.issueYear,
      type: dto.type,
      restriction: dto.restriction,
      status: dto.status,
      genres: genres,
      categories: categories,
    });
  }

  async addMangaImage(id: number, imageBuffer: Buffer) {
    const image = await this.filesService.uploadMangaImg(imageBuffer);

    this.repository.update(+id, {
      image,
    });
  }

  async getGenreByIds(ids: Array<number>) {
    return this.genresService.findById(ids);
  }

  async getCategoryByIds(ids: Array<number>) {
    return this.categoriesService.findById(ids);
  }

  async getMangaByQuery(query: SearchMangaDto) {
    const take = query.take || 30;
    const page = query.page || 1;
    const skip = query.skip || (page - 1) * take;
    const orderby = query.orderby || 'DESC';
    const types = query.types;
    const restrictions = query.restrictions;
    const statuses = query.statuses;
    const genres = query.genres;
    const categories = query.categories;
    const excludedTypes = query.excludedTypes;
    const excludedGenres = query.excludedGenres;
    const excludedCategories = query.excludedCategories;

    const sortby = query.sortby || SortByEnum.createdAt;

    const keyword = query.keyword;

    const qb = this.repository.createQueryBuilder('manga');

    qb.leftJoinAndSelect('manga.image', 'image')
      .leftJoinAndSelect('manga.type', 'type')
      .leftJoinAndSelect('manga.status', 'status')
      .leftJoinAndSelect('manga.genres', 'genres')
      .leftJoinAndSelect('manga.restriction', 'restriction')
      .leftJoinAndSelect('manga.categories', 'categories')
      .setParameters({
        keyword: `%${keyword}%`,
      })

      .take(take)
      .skip(skip);

    if (keyword) {
      qb.orWhere('manga.title ILIKE :keyword').orWhere(
        'manga.otherTitles ILIKE :keyword',
      );
    }

    types &&
      types.length > 0 &&
      qb.andWhere('manga.type IN (:...types)', { types: types });

    restrictions &&
      restrictions.length > 0 &&
      qb.andWhere('manga.restriction IN (:...restrictions)', {
        restrictions: restrictions,
      });
    statuses &&
      statuses.length > 0 &&
      qb.andWhere('manga.status IN (:...statuses)', { statuses: statuses });

    genres &&
      genres.length > 0 &&
      genres.map((param) => {
        qb.leftJoin('manga.genres', `genresFilter${param}`);
        qb.andWhere(`genresFilter${param}.id  = :genres${param}`, {
          [`genres${param}`]: param,
        });
      });

    categories &&
      categories.length > 0 &&
      categories.map((param) => {
        qb.leftJoin('manga.categories', `categoriesFilter${param}`);
        qb.andWhere(`categoriesFilter${param}.id = :categories${param}`, {
          [`categories${param}`]: param,
        });
      });

    excludedTypes &&
      excludedTypes.length > 0 &&
      qb.andWhere('manga.type NOT IN (:...excludedTypes)', {
        excludedTypes: excludedTypes,
      });

    excludedGenres &&
      excludedGenres.length > 0 &&
      excludedGenres.map((param) => {
        qb.leftJoin('manga.genres', `excludedGenres${param}`);
        qb.andWhere(
          ` (excludedGenres${param}.id)  !=  :excludedGenres${param}`,
          {
            [`excludedGenres${param}`]: param,
          },
        );
      });

    excludedCategories &&
      excludedCategories.length > 0 &&
      excludedCategories.map((param) => {
        qb.leftJoin('manga.categories', `excludedCategories${param}`);
        qb.andWhere(
          `excludedCategories${param}.id != :excludedCategories${param}`,
          {
            [`excludedCategories${param}`]: param,
          },
        );
      });

    if (sortby === SortByEnum.createdAt) {
      qb.orderBy('manga.createdAt', orderby);
    }

    if (sortby === SortByEnum.views) {
      qb.orderBy('manga.views', orderby);
    }

    const data = await qb.getManyAndCount();

    const [items, count] = data;

    return { items, count };
  }

  async getMangaById(id: number) {
    const manga = await this.repository.findOne(+id);
    if (manga) {
      return manga;
    }
    throw new NotFoundException("Manga with this id doesn't exist");
  }

  async findOneById(id: number, userId?: number) {
    this.repository
      .createQueryBuilder('manga')
      .whereInIds(id)
      .update()
      .set({ views: () => 'views +1' })
      .execute();
    const bookmark = await getRepository(BookmarksEntity)
      .createQueryBuilder('bookmarks')
      .andWhere('bookmarks.userId = :userId', { userId: userId })
      .andWhere('bookmarks.manga.id = :mangaId', { mangaId: id })
      .getOne();

    const ratedByUser = await getRepository(RatingEntity)
      .createQueryBuilder('rating')
      .andWhere('rating.userId = :userId', { userId: userId })
      .andWhere('rating.mangaId = :mangaId', { mangaId: id })
      .getOne();

    const manga = await this.getMangaById(+id);
    return {
      manga,
      bookmark: bookmark ? bookmark : null,
      ratedByUser: ratedByUser ? ratedByUser : null,
    };
  }

  update(id: number, dto: UpdateMangaDto) {
    return this.repository.update(+id, dto);
  }

  async remove(id: number) {
    const find = await this.repository.delete(+id);

    if (!find) {
      throw new NotFoundException("Doesn't exist");
    }

    return find;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookmarksEntity } from 'src/bookmarks/entities/bookmark.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { FilesService } from 'src/files/files.service';
import { GenresService } from 'src/genres/genres.service';
import { getRepository, In, Like, Repository } from 'typeorm';
import { CreateMangaDto } from './dto/create-manga.dto';
import { SearchMangaDto } from './dto/search-manga.dto';
import { UpdateMangaDto } from './dto/update-manga.dto';
import { MangaEntity } from './entities/manga.entity';

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
    const image = await this.filesService.uploadPublicFile(imageBuffer);

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

  async getPopularMangas() {
    const qb = this.repository.createQueryBuilder();

    qb.orderBy('views', 'DESC').limit(30);

    const [items, total] = await qb.getManyAndCount();

    return { items, total };
  }
  async getMangaByQuery(query: SearchMangaDto) {
    const take = query.take || 30;
    const page = query.page || 1;
    const skip = query.skip || (page - 1) * take;

    const keyword = query.keyword || '';

    const qb = this.repository.createQueryBuilder('manga');

    qb.leftJoinAndSelect('manga.image', 'image')
      .leftJoinAndSelect('manga.type', 'type')
      .leftJoinAndSelect('manga.status', 'status')
      .leftJoinAndSelect('manga.restriction', 'restriction')
      .leftJoinAndSelect('manga.genres', 'genres')
      .leftJoinAndSelect('manga.categories', 'categories')
      .setParameters({
        keyword: `%${keyword}%`,
      })
      .orderBy('manga.createdAt', 'DESC')
      .orWhere(`manga.title ILIKE :keyword`)
      .orWhere(`manga.otherTitles ILIKE :keyword`)
      .take(take)
      .skip(skip);

    const data = await qb.getManyAndCount();

    return this.paginateResponse(data, page, skip);
  }

  async paginateResponse(data, page, skip) {
    const [result, total] = data;
    const lastPage = Math.ceil(total / skip);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;
    return {
      items: [...result],
      count: total,
      // currentPage: page,
      // nextPage: nextPage,
      // prevPage: prevPage,
      // lastPage: lastPage,
    };
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

    const manga = await this.getMangaById(+id);

    return { item: manga, bookmark: bookmark || null };
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

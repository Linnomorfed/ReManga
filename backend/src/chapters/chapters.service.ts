import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookmarksEntity } from 'src/bookmarks/entities/bookmark.entity';
import { MangaEntity } from 'src/manga/entities/manga.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { getRepository, Repository } from 'typeorm';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { SearchChapterDto } from './dto/search-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { ChaptersEntity } from './entities/chapter.entity';

@Injectable()
export class ChaptersService {
  constructor(
    @InjectRepository(ChaptersEntity)
    private repository: Repository<ChaptersEntity>,
  ) {}

  create(dto: CreateChapterDto, manga: MangaEntity) {
    return this.repository.save({
      manga: manga,
      volume: dto.volume,
      chapter_number: dto.chapter,
      isPaid: dto.isPaid,
    });
  }

  async getCount(mangaId: number) {
    if (!mangaId) {
      throw new NotFoundException('You have to set manga id');
    }
    const qb = this.repository
      .createQueryBuilder('chapters')
      .where('chapters.mangaId = :mangaId', { mangaId: +mangaId });

    const count = await qb.getCount();

    return count;
  }

  async findAll(query: SearchChapterDto, user?: UserEntity) {
    const mangaId = query.mangaId;
    const orderBy = query.orderBy || 'DESC';
    let arr = [];

    if (!mangaId) {
      throw new NotFoundException('You have to set manga id');
    }
    const qb = this.repository
      .createQueryBuilder('chapters')
      .orderBy('chapters.createdAt', orderBy)
      .where('chapters.mangaId = :mangaId', { mangaId: +mangaId });

    if (user) {
      const res = await this.repository
        .createQueryBuilder('ch')
        .leftJoinAndSelect('ch.likes', 'likes')
        .andWhere('ch.mangaId = :mangaId', { mangaId: +mangaId })
        .andWhere('likes.userId = :userId', { userId: +user.id })
        .getMany();

      res.forEach((obj) => (arr = [...arr, obj.likes[0].chapterId]));
    }
    const content = await qb.getMany();

    const result = content.map((obj) =>
      arr.includes(obj.id)
        ? {
            ...obj,
            rated: true,
          }
        : {
            ...obj,
            rated: false,
          },
    );

    return result;
  }

  findOne(id: number) {
    return this.repository.findOne(+id);
  }

  async getCertainChapter(id: number, user?: UserEntity) {
    let userLike = null;

    const qb = this.repository
      .createQueryBuilder('chapters')
      .leftJoinAndSelect('chapters.pages', 'pages');

    const result = await qb.andWhere('chapters.id = :id', { id: +id }).getOne();

    const { title } = await getRepository(MangaEntity)
      .createQueryBuilder('manga')
      .where('manga.id = :mangaId', { mangaId: result.mangaId })
      .getOne();

    if (user) {
      const res = await this.repository
        .createQueryBuilder('ch')
        .leftJoinAndSelect('ch.likes', 'likes')
        .andWhere('ch.id = :id', { id })
        .andWhere('likes.userId = :userId', { userId: +user.id })
        .getOne();
      if (res) {
        userLike = res.likes[0].chapterId;
      }
    }

    const content =
      result.id === userLike
        ? {
            ...result,
            rated: true,
            mangaTitle: title,
          }
        : {
            ...result,
            rated: false,
            mangaTitle: title,
          };

    const AllChapters = await this.repository
      .createQueryBuilder('ch')
      .where('ch.mangaId=:mangaId', { mangaId: result.mangaId })
      .orderBy('ch.createdAt', 'ASC')
      .getMany();

    const index = AllChapters.map((obj) => obj.id).indexOf(result.id);

    const lastIndex = AllChapters.length - 1;

    const nextPage = lastIndex === index ? null : index + 1;
    const prevPage = index === 0 ? null : index - 1;

    const nextPageId = nextPage ? AllChapters[nextPage].id : null;
    const prevPageId = prevPage ? AllChapters[prevPage].id : null;

    return { content, nextPageId, prevPageId };
  }

  async getNewestChapters(query: SearchChapterDto, user?: UserEntity) {
    const take = 20;
    const isOnlyMyBookmarks = +query.isOnlyMyBookmarks || 0;

    console.log(isOnlyMyBookmarks, 'isOnlyMyBookmarks');

    if (isOnlyMyBookmarks && !user) {
      throw new ForbiddenException('Not authorized');
    }

    const qb = this.repository
      .createQueryBuilder('chapters')
      .leftJoinAndSelect('chapters.manga', 'manga')
      .leftJoinAndSelect('manga.image', 'image')
      .leftJoinAndSelect('manga.type', 'type')
      .leftJoinAndSelect('manga.status', 'status')
      .leftJoinAndSelect('manga.genres', 'genres')
      .leftJoinAndSelect('manga.restriction', 'restriction')
      .leftJoinAndSelect('manga.categories', 'categories')
      .orderBy('chapters.createdAt', 'DESC')
      .take(take);

    if (isOnlyMyBookmarks === 1) {
      const mangaRes = await getRepository(BookmarksEntity)
        .createQueryBuilder('bookmarks')
        .leftJoinAndSelect('bookmarks.manga', 'manga')
        .where('bookmarks.userId = :userId', { userId: user.id })
        .select('manga.id', 'id')
        .getRawMany();

      const ids = mangaRes.map((obj) => obj.id);
      qb.andWhere('manga.id IN (:...ids)', { ids });
    }

    const res = await qb.getMany();

    const counts = {};

    res.forEach((el) => {
      counts[el.manga.id] = (counts[el.manga.id] || 0) + 1;
    });

    let newArr = [];
    res.map(
      (obj) =>
        (newArr = [
          ...newArr,
          {
            ...obj,
            repeatsCount: counts[obj.manga.id],
          },
        ]),
    );

    const uniqueArr = Object.values(
      newArr.reduce((acc, obj) => ({ ...acc, [obj.manga.id]: obj }), {}),
    );

    return uniqueArr;
  }

  update(id: number, dto: UpdateChapterDto) {
    return this.repository.update(id, dto);
  }

  remove(id: number) {
    return `This action removes a #${id} chapter`;
  }
}

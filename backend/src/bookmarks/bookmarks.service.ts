import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MangaEntity } from 'src/manga/entities/manga.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { SearchBookmarkDto } from './dto/search-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { BookmarksEntity } from './entities/bookmark.entity';

@Injectable()
export class BookmarksService {
  constructor(
    @InjectRepository(BookmarksEntity)
    private repository: Repository<BookmarksEntity>,
  ) {}

  create(dto: CreateBookmarkDto, user: UserEntity, manga: MangaEntity) {
    return this.repository.save({
      manga: manga,
      bookmarkId: dto.bookmarkId,
      user: user,
    });
  }

  async findByQuery(query: SearchBookmarkDto) {
    const userId = +query.userId;
    const bookmarkId = +query.bookmarkId;

    const qb = this.repository.createQueryBuilder('b');
    const items = await qb
      .leftJoinAndSelect('b.manga', 'manga')
      .leftJoinAndSelect('manga.image', 'image')
      .andWhere('b.userId = :userId', { userId: userId })
      .andWhere('b.bookmarkId = :bookmarkId', { bookmarkId: bookmarkId })
      .getMany();

    return items;
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, dto: UpdateBookmarkDto) {
    return this.repository.update(id, dto);
  }
  remove(id: number) {
    return `This action removes a #${id} bookmark`;
  }
}

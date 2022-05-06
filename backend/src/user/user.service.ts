import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookmarksEntity } from 'src/bookmarks/entities/bookmark.entity';
import { getRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}
  create(dto: CreateUserDto) {
    return this.repository.save(dto);
  }

  findAll() {
    return this.repository.find();
  }

  async findById(id: number) {
    const user = await this.repository.findOne(id);

    return user;
  }

  async getOneById(id: number) {
    const bookmarksPreload = await getRepository(BookmarksEntity)
      .createQueryBuilder('bookmarks')
      .leftJoinAndSelect('bookmarks.manga', 'manga')
      .innerJoinAndSelect('manga.image', 'image')
      .andWhere('bookmarks.userId = :userId', { userId: id })
      .andWhere('bookmarks.bookmarkId = :bookmarkId', { bookmarkId: 1 })
      .getManyAndCount();

    const will_read = await getRepository(BookmarksEntity)
      .createQueryBuilder('bookmarks')
      .andWhere('bookmarks.userId = :id', { id: id })
      .andWhere('bookmarks.bookmarkId = 2')
      .getCount();

    const read = await getRepository(BookmarksEntity)
      .createQueryBuilder('bookmarks')
      .andWhere('bookmarks.userId = :id', { id: id })
      .andWhere('bookmarks.bookmarkId = 3')
      .getCount();

    const thrown = await getRepository(BookmarksEntity)
      .createQueryBuilder('bookmarks')
      .andWhere('bookmarks.userId = :id', { id: id })
      .andWhere('bookmarks.bookmarkId = 4')
      .getCount();

    const not_interesting = await getRepository(BookmarksEntity)
      .createQueryBuilder('bookmarks')
      .andWhere('bookmarks.userId = :id', { id: id })
      .andWhere('bookmarks.bookmarkId = 5')
      .getCount();

    const [preloadedData, readingCount] = bookmarksPreload;

    const user = await this.repository.findOne(id);

    return {
      data: user,
      preloadedData,
      bookmarksCount: [readingCount, will_read, read, thrown, not_interesting],
    };
  }

  findByConditions(cond: LoginUserDto) {
    return this.repository.findOne(cond);
  }

  findByEmail(email: string): Promise<UserEntity> {
    return this.repository.findOne({ email });
  }

  update(id: number, dto: UpdateUserDto) {
    return this.repository.update(id, dto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MangaEntity } from 'src/manga/entities/manga.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
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

    if (!mangaId) {
      throw new NotFoundException('You have to set manga id');
    }
    const qb = this.repository
      .createQueryBuilder('chapters')
      .orderBy('chapters.createdAt', orderBy)
      .where('chapters.mangaId = :mangaId', { mangaId: +mangaId });

    const content = await qb.getMany();

    return content;
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, dto: UpdateChapterDto) {
    return this.repository.update(id, dto);
  }

  remove(id: number) {
    return `This action removes a #${id} chapter`;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChaptersService } from 'src/chapters/chapters.service';
import { ChaptersEntity } from 'src/chapters/entities/chapter.entity';
import { MangaEntity } from 'src/manga/entities/manga.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { getRepository, Repository } from 'typeorm';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { LikeEntity } from './entities/like.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(LikeEntity)
    private repository: Repository<LikeEntity>,
    private chaptersService: ChaptersService,
  ) {}

  async create(dto: CreateLikeDto, user: UserEntity) {
    const chapter = await this.chaptersService.findOne(dto.chapterId);

    if (!chapter) {
      throw new NotFoundException("Chapter with this id doesn't exist");
    }

    getRepository(ChaptersEntity)
      .createQueryBuilder('chapters')
      .update()
      .set({ likes_count: () => 'likes_count + 1' })
      .where('id = :id', { id: chapter.id })
      .execute();

    getRepository(UserEntity)
      .createQueryBuilder('user')
      .update()
      .set({ liked_chapters: () => 'liked_chapters + 1' })
      .where('id = :id', { id: user.id })
      .execute();

    getRepository(MangaEntity)
      .createQueryBuilder('manga')
      .update()
      .set({ likes_count: () => 'likes_count + 1' })
      .where('id = :id', { id: chapter.mangaId })
      .execute();

    return this.repository.save({
      user,
      chapter,
    });
  }

  findAll() {
    return `This action returns all likes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} like`;
  }

  update(id: number, dto: UpdateLikeDto) {
    return `This action updates a #${id} like`;
  }

  remove(id: number) {
    return `This action removes a #${id} like`;
  }
}

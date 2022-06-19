import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { getRepository, Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { SearchCommentDto } from './dto/search-comments.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private repository: Repository<CommentEntity>,
  ) {}
  async create(dto: CreateCommentDto, user: UserEntity) {
    const replyTo = dto.replyTo;
    const chapterId = dto.chapterId || null;
    if (replyTo) {
      this.repository
        .createQueryBuilder('c')
        .update()
        .set({ replies_count: () => 'replies_count +1' })
        .where('id = :id', { id: replyTo })
        .execute();
    }

    getRepository(UserEntity)
      .createQueryBuilder('user')
      .update()
      .set({ left_comments: () => 'left_comments +1' })
      .where('id = :id', { id: user.id })
      .execute();

    return this.repository.save({
      text: dto.text,
      manga: { id: dto.mangaId },
      spoiler: dto.spoiler,
      user: user,
      replyTo: replyTo,
      chapterId: chapterId,
    });
  }

  async chapterFindAll(query: SearchCommentDto) {
    const take = 20;
    const page = query.page || 1;
    const skip = (page - 1) * take;
    const mangaId = query.mangaId;
    const chapterId = query.chapterId;
  }

  async mangaFindAll(query: SearchCommentDto) {
    const take = 20;
    const page = query.page || 1;
    const skip = (page - 1) * take;
    const mangaId = query.mangaId;
    const replyTo = query.replyTo;
    const chapterId = query.chapterId;
    const pinnedQb = this.repository.createQueryBuilder('pinned');

    let pinned = null;
    if (!chapterId) {
      pinnedQb
        .where('pinned.pinned = :mangaId', {
          mangaId,
        })
        .leftJoinAndSelect('pinned.user', 'user');
      pinned = await pinnedQb.getOne();
    }

    const qb = this.repository.createQueryBuilder('c');
    qb.orderBy('c.createdAt', 'DESC').leftJoinAndSelect('c.user', 'user');

    if (mangaId && !chapterId) {
      qb.andWhere('c.mangaId = :mangaId', { mangaId })
        .andWhere('c.pinned IS NULL')
        .andWhere('c.replyTo IS NULL')
        .andWhere('c.chapterId IS NULL');
    }

    if (replyTo) {
      qb.where('c.replyTo = :replyTo', { replyTo });
    }

    if (mangaId && chapterId) {
      qb.andWhere('c.mangaId = :mangaId', { mangaId })
        .andWhere('c.pinned IS NULL')
        .andWhere('c.replyTo IS NULL')
        .andWhere('c.chapterId = :chapterId', { chapterId });
    }

    qb.take(take).skip(skip);

    const data = await qb.getManyAndCount();

    const [result, total] = data;

    return {
      items: [...result],
      count: total,
      pinned: pinned,
    };
  }
  findOne(id: number) {
    return this.repository.findOne(+id);
  }

  update(id: number, dto: UpdateCommentDto) {
    return this.repository.update(+id, dto);
  }
  remove(id: number) {
    return this.repository.delete(+id);
  }
}

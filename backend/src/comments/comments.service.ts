import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { getRepository, Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PinCommentDto } from './dto/pin-comment.dto';
import { SearchCommentDto } from './dto/search-comments.dto';
import { UpdateCertainCommentDto } from './dto/update-certain_comment.dto';
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

  async addCommentRate(
    id: number,
    dto: UpdateCertainCommentDto,
    user: UserEntity,
  ) {
    const rate = dto.rate;

    const comment = await this.findOne(+id);
    const content = [...comment.rated_userIds, { userId: user.id, rate: rate }];

    this.repository.update(+id, {
      rated_userIds: content,
      rating: rate === 'like' ? comment.rating + 1 : comment.rating - 1,
    });
  }

  async removeCommentRate(
    id: number,
    dto: UpdateCertainCommentDto,
    user: UserEntity,
  ) {
    const rate = dto.rate;

    const comment = await this.findOne(+id);
    const arr = comment.rated_userIds.filter((obj) => obj.userId !== user.id);

    this.repository.update(+id, {
      rated_userIds: arr,
      rating: rate === 'like' ? comment.rating - 1 : comment.rating + 1,
    });
  }

  async updateCommentRate(
    id: number,
    dto: UpdateCertainCommentDto,
    user: UserEntity,
  ) {
    const rate = dto.rate;

    const comment = await this.findOne(+id);
    const arr = comment.rated_userIds.filter((obj) => obj.userId !== user.id);
    const content = [...arr, { userId: user.id, rate: rate }];

    this.repository.update(+id, {
      rated_userIds: content,
      rating: rate === 'like' ? comment.rating + 2 : comment.rating - 2,
    });
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

  async pinComment(dto: PinCommentDto, user: UserEntity) {
    const result = await this.repository
      .createQueryBuilder('comments')
      .andWhere('comments.mangaId = :mangaId', { mangaId: +dto.mangaId })
      .andWhere('comments.pinned IS NOT NULL')
      .getOne();

    if (result) {
      await this.repository.update(result.id, {
        pinned: null,
      });
    }

    await this.repository.update(dto.commentId, {
      pinned: dto.mangaId,
    });

    const content = await this.repository.findOne(dto.commentId);

    return content;
  }

  async unpinComment(commentId: number, user: UserEntity) {
    await this.repository.update(+commentId, {
      pinned: null,
    });
    return 'ok';
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

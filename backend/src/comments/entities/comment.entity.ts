import { MangaEntity } from 'src/manga/entities/manga.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

interface RatedUserData {
  userId: number;
  rate: 'like' | 'dislike';
}

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column({ nullable: false })
  spoiler: boolean;

  @Column({ default: 0 })
  rating: number;

  @Column({ default: 0 })
  replies_count: number;

  @Column({ type: 'jsonb', default: [] })
  rated_userIds: RatedUserData[];

  @Column({ nullable: true })
  replyTo: number;

  @Column({ nullable: true })
  pinned: number;

  @Column({ nullable: true })
  chapterId: number;

  @ManyToOne(() => UserEntity, { nullable: false, eager: true })
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => MangaEntity, { nullable: false })
  @JoinColumn({ name: 'mangaId' })
  manga: MangaEntity;

  @Column({ nullable: false })
  mangaId: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

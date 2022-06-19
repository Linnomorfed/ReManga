import { ChaptersEntity } from 'src/chapters/entities/chapter.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('likes')
export class LikeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column()
  userId: number;

  @ManyToOne(() => ChaptersEntity, (chapters) => chapters.likes, {
    nullable: false,
  })
  @JoinColumn({ name: 'chapterId' })
  chapter: ChaptersEntity;

  @Column()
  chapterId: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}

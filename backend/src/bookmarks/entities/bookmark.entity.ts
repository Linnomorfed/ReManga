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

@Entity('bookmarks')
export class BookmarksEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  bookmarkId: number;

  @ManyToOne(() => MangaEntity, { eager: true, nullable: false })
  @JoinColumn()
  manga: MangaEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

import { MangaEntity } from 'src/manga/entities/manga.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('rating')
export class RatingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ nullable: false })
  userId: number;

  @ManyToOne(() => MangaEntity)
  @JoinColumn({ name: 'mangaId' })
  manga: MangaEntity;

  @Column({ nullable: false })
  mangaId: number;

  @Column({ nullable: false })
  rate: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}

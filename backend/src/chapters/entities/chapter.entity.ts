import { LikeEntity } from 'src/likes/entities/like.entity';
import { MangaEntity } from 'src/manga/entities/manga.entity';
import PageEntity from 'src/pages/entities/page.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('chapters')
export class ChaptersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 1 })
  volume: number;

  @Column()
  chapter_number: number;

  @Column({ nullable: true })
  chapter_name: string;

  @Column({ default: false })
  isPaid: boolean;

  @OneToMany(() => PageEntity, (page) => page.chapter, {
    cascade: true,
  })
  pages: PageEntity[];

  @OneToMany(() => LikeEntity, (likes) => likes.chapter, {
    cascade: true,
  })
  likes: LikeEntity[];

  @Column({ default: 0 })
  likes_count: number;

  @ManyToOne(() => MangaEntity, (manga) => manga.chapters)
  @JoinColumn({ name: 'mangaId' })
  manga: MangaEntity;

  @Column({ nullable: false })
  mangaId: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

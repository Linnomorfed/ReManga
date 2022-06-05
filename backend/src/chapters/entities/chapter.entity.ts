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

  @OneToMany(() => PageEntity, (page) => page.chapter, {
    cascade: true,
  })
  pages: PageEntity[];

  @Column({ default: 0 })
  likes: number;

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

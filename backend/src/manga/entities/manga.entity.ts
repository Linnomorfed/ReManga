import { CategoryEntity } from 'src/categories/entities/category.entity';
import { ChaptersEntity } from 'src/chapters/entities/chapter.entity';
import FileEnity from 'src/files/entities/file.entity';
import { GenresEntity } from 'src/genres/entities/genre.entity';
import { RestrictionEntity } from 'src/restriction/entities/restriction.entity';
import { StatusEntity } from 'src/status/entities/status.entity';
import { TypesEntity } from 'src/types/entities/type.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('manga')
export class MangaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  issueYear: number;

  @Column({ nullable: true })
  otherTitles: string;

  @Column({ type: 'jsonb' })
  blocks: any[];

  @OneToMany(() => ChaptersEntity, (chapters) => chapters.manga, {
    cascade: true,
  })
  chapters: ChaptersEntity[];

  @Column({ type: 'real', default: 0 })
  rating: number;

  @Column({ default: 0 })
  votes_count: number;

  @Column({ default: 0 })
  likes_count: number;

  @Column({ default: 0 })
  views: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => TypesEntity, { eager: true })
  type: TypesEntity;

  @ManyToOne(() => StatusEntity, { eager: true })
  status: StatusEntity;

  @ManyToOne(() => RestrictionEntity, {
    eager: true,
  })
  restriction: RestrictionEntity;

  @ManyToMany(() => GenresEntity, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  genres: GenresEntity[];

  @ManyToMany(() => CategoryEntity, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  categories: CategoryEntity[];

  @JoinColumn()
  @OneToOne(() => FileEnity, {
    eager: true,
    nullable: true,
  })
  image: FileEnity;
}

import { ChaptersEntity } from 'src/chapters/entities/chapter.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('pages')
class PageEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public url: string;

  @Column()
  public key: string;

  @ManyToOne(() => ChaptersEntity, (chapters) => chapters.pages)
  @JoinColumn({ name: 'chapterId' })
  chapter: ChaptersEntity;

  @Column()
  chapterId: number;
}

export default PageEntity;

import { MangaEntity } from 'src/manga/entities/manga.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('genres')
export class GenresEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => MangaEntity, { eager: false })
  manga: MangaEntity[];
}

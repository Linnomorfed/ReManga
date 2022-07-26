import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  TranslatorsLinks,
  TranslatorsLinksDefault,
} from '../interfaces/translatorsLinks';

@Entity('translators')
export class TranslatorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  tagline: string;

  @Column({ default: null })
  picture: string;

  @Column({ default: false })
  is_identified: boolean;

  @Column({
    type: 'jsonb',
    default: TranslatorsLinksDefault,
  })
  links: TranslatorsLinks;

  @Column({ default: 0 })
  total_likes: number;

  @Column({ default: 0 })
  total_chapters: number;

  @Column({ default: 0 })
  manga_count: number;

  @OneToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'leaderId' })
  leader: UserEntity;

  @Column()
  leaderId: number;

  @ManyToMany(() => UserEntity, (user) => user.within_teams)
  @JoinTable()
  translators: UserEntity[];
}

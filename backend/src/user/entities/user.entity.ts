import { Exclude } from 'class-transformer';
import { TranslatorEntity } from 'src/translators/entities/translator.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: 0 })
  left_comments: number;

  @Column({ default: 0 })
  liked_chapters: number;

  @ManyToMany(
    () => TranslatorEntity,
    (translators) => translators.translators,
    {
      cascade: true,
    },
  )
  within_teams: TranslatorEntity[];

  @Exclude({ toPlainOnly: true })
  @Column({ nullable: true })
  password?: string;

  @Column({ default: false })
  isEmailConfirmed: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

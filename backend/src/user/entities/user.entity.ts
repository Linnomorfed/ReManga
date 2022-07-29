import { Exclude } from 'class-transformer';
import { MemberEntity } from 'src/members/entities/member.entity';
import { TranslatorEntity } from 'src/translators/entities/translator.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column()
  email: string;

  @Column({ default: 0 })
  left_comments: number;

  @Column({ default: 0 })
  liked_chapters: number;

  @OneToMany(() => MemberEntity, (member: MemberEntity) => member.user, {
    eager: true,
  })
  within_teams: MemberEntity[];

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

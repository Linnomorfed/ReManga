import { TranslatorEntity } from 'src/translators/entities/translator.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { BaseModel } from 'src/utils/BaseModel.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('invites')
export class InviteEntity extends BaseModel {
  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column()
  userId: number;

  @OneToOne(() => TranslatorEntity)
  @JoinColumn({ name: 'translatorsTeamId' })
  translatorsTeam: TranslatorEntity;

  @Column()
  translatorsTeamId: number;
}

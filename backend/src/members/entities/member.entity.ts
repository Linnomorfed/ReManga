import { MemberPermissions } from 'aws-sdk/clients/cloud9';
import { TranslatorEntity } from 'src/translators/entities/translator.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { BaseModel } from 'src/utils/BaseModel.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { MemberRoles } from '../enums/roles.enum';

@Entity('members')
export class MemberEntity extends BaseModel {
  @ManyToOne(() => UserEntity, (user) => user.within_teams)
  user: UserEntity;

  @ManyToOne(() => TranslatorEntity, (team) => team.members)
  translatorsTeam: TranslatorEntity;

  @Column()
  permission: MemberPermissions;

  @Column()
  role: MemberRoles;
}

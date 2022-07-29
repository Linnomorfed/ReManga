import { IsNotEmpty, IsNumber } from 'class-validator';
import { MemberPermissions } from '../enums/permisions.enum';
import { MemberRoles } from '../enums/roles.enum';

export class CreateMemberDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  teamId: number;

  @IsNotEmpty()
  permission: MemberPermissions;

  @IsNotEmpty()
  role: MemberRoles;
}

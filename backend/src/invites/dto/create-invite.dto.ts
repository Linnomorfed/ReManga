import { IsNotEmpty } from 'class-validator';

export class CreateInviteDto {
  @IsNotEmpty()
  teamId: number | string;
}

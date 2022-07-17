import { IsNotEmpty } from 'class-validator';

export class PinCommentDto {
  @IsNotEmpty()
  mangaId: number;

  @IsNotEmpty()
  commentId: number;
}

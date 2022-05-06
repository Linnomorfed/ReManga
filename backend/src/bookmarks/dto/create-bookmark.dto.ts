import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBookmarkDto {
  @IsNotEmpty()
  @IsNumber()
  mangaId: number;

  @IsNotEmpty()
  @IsNumber()
  bookmarkId: number;
}

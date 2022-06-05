import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateChapterDto {
  @IsNotEmpty()
  @IsNumber()
  mangaId: number;

  @IsNotEmpty()
  @IsNumber()
  volume: number;

  @IsNotEmpty()
  @IsNumber()
  chapter: number;

  pages_array?: string[];
}

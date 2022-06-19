import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateChapterDto {
  @IsNotEmpty()
  @IsNumber()
  mangaId: number;

  @IsString()
  @IsOptional()
  chapte_name: string;

  @IsNotEmpty()
  @IsNumber()
  volume: number;

  @IsNotEmpty()
  @IsNumber()
  chapter: number;

  @IsOptional()
  @IsBoolean()
  isPaid: boolean;
}

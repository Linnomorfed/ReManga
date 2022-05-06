import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { UniqueOnDatabase } from 'src/auth/validations/UniqueValidation';
import { MangaEntity } from '../entities/manga.entity';

export class CreateMangaDto {
  @IsString()
  @UniqueOnDatabase(MangaEntity)
  title: string;

  @IsString()
  @IsOptional()
  otherTitles: string;

  @IsArray()
  blocks: any[];

  @IsNumber()
  issueYear: number;

  @IsNumber()
  type: any;

  @IsNumber()
  restriction: any;

  @IsNumber()
  status: any;

  @IsArray()
  genreIds: number[];

  @IsArray()
  categoryIds: number[];

  @IsOptional()
  userId: number;
}

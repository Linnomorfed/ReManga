import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UniqueOnDatabase } from 'src/auth/validations/UniqueValidation';
import { TranslatorEntity } from '../entities/translator.entity';

export class CreateTranslatorDto {
  @IsNotEmpty()
  @IsString()
  @UniqueOnDatabase(TranslatorEntity)
  title: string;

  @IsOptional()
  @IsString()
  tagline: string;
}

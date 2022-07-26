import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTranslatorDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  tagline: string;

  @IsNotEmpty()
  leaderId: number;
}

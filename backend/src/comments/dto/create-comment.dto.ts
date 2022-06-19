import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  text: string;

  @IsBoolean()
  @IsOptional()
  spoiler: boolean;

  @IsNumber()
  @IsOptional()
  replyTo: number;

  @IsNotEmpty()
  mangaId: number;

  @IsOptional()
  chapterId: number;
}

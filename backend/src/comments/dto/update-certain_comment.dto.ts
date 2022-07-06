import { IsOptional } from 'class-validator';

export class UpdateCertainCommentDto {
  @IsOptional()
  rate: 'like' | 'dislike';
}

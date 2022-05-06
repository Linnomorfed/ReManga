import { PartialType } from '@nestjs/mapped-types';
import { CreateFileDto } from './create-manga.dto';

export class UpdateMangaDto extends PartialType(CreateFileDto) {}

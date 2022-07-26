import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Body,
  UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ChaptersService } from 'src/chapters/chapters.service';
import { PagesService } from './pages.service';

@Controller('pages')
export class PagesController {
  constructor(
    private readonly pagesService: PagesService,
    private readonly chapterService: ChaptersService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('page'))
  async uploadPublicFile(
    @Body() body,
    @UploadedFiles() pages: Array<Express.Multer.File>,
  ) {
    this.pagesService.uploadChapterFiles(+body.id, pages);
  }
}

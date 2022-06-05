import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChaptersService } from 'src/chapters/chapters.service';
import { PagesService } from './pages.service';

@Controller('pages')
export class PagesController {
  constructor(
    private readonly pagesService: PagesService,
    private readonly chapterService: ChaptersService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('page'))
  async uploadPublicFile(
    @Body() body,
    @UploadedFile() pages: Express.Multer.File,
  ) {
    this.pagesService.uploadChapterFiles(+body.id, pages.buffer);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagesService.remove(+id);
  }
}

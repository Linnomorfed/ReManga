import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CreateFileDto } from './dto/create-manga.dto';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async uploadPublicFile(@UploadedFile() image: Express.Multer.File) {
    this.filesService.uploadPublicFile(image.buffer);
  }

  @Post('chapter')
  @UseInterceptors(FilesInterceptor('images'))
  async uploadChapterFiles(@UploadedFile() images: Array<Express.Multer.File>) {
    //this.filesService.uploadPublicFile(image.buffer);
    console.log(images);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(+id);
  }
}

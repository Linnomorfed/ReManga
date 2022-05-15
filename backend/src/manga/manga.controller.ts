import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { MangaService } from './manga.service';
import { CreateMangaDto } from './dto/create-manga.dto';
import { UpdateMangaDto } from './dto/update-manga.dto';
import { SearchMangaDto } from './dto/search-manga.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { User } from 'src/decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OptionalJwtAuthGuard } from 'src/auth/guards/optional-jwt-auth.guard';

@Controller('manga')
export class MangaController {
  constructor(private readonly mangaService: MangaService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@User() user: UserEntity, @Body() dto: CreateMangaDto) {
    const genres = await this.mangaService.getGenreByIds(dto.genreIds);
    const categories = await this.mangaService.getCategoryByIds(
      dto.categoryIds,
    );
    return this.mangaService.create(dto, genres, categories);
  }

  @Post('image')
  @UseInterceptors(FileInterceptor('image'))
  async addImageToManga(
    @Body() body,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.mangaService.addMangaImage(+body.id, image.buffer);
  }

  @Get()
  getByQuery(@Query() query: SearchMangaDto) {
    return this.mangaService.getMangaByQuery(query);
  }

  @Get('popular')
  getPopular() {
    return this.mangaService.getPopularMangas();
  }

  @Get(':id')
  @UseGuards(OptionalJwtAuthGuard)
  findOne(@User() user: UserEntity, @Param('id') id: number) {
    return this.mangaService.findOneById(+id, user.id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateMangaDto) {
    return this.mangaService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.mangaService.remove(+id);
  }
}

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
import { GenresService } from 'src/genres/genres.service';
import { CategoriesService } from 'src/categories/categories.service';

@Controller('manga')
export class MangaController {
  constructor(
    private readonly mangaService: MangaService,
    private genresService: GenresService,
    private categoriesService: CategoriesService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@User() user: UserEntity, @Body() dto: CreateMangaDto) {
    const genres = await this.genresService.findById(dto.genreIds);
    const categories = await this.categoriesService.findById(dto.categoryIds);
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

  @Get('top')
  getMangaTopByQuery(@Query() query: SearchMangaDto) {
    return this.mangaService.getMangaTopByQuery(query);
  }

  @Get('popular/week')
  getWeekPopular() {
    return this.mangaService.getWeekPopular();
  }
  @Get('popular/today')
  getTodayPopular(@Query() query: SearchMangaDto) {
    return this.mangaService.getTodayPopular(query);
  }
  @Get('popular/newest')
  getNewestPopular() {
    return this.mangaService.getNewestPopular();
  }

  @Get(':id')
  @UseGuards(OptionalJwtAuthGuard)
  findOne(@User() user: UserEntity, @Param('id') id: number) {
    return this.mangaService.findOneById(+id, user.id);
  }

  @Get('panel/:id')
  @UseGuards(JwtAuthGuard)
  getOneForUpdate(@User() user: UserEntity, @Param('id') id: number) {
    return this.mangaService.getOneForUpdate(+id, user);
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

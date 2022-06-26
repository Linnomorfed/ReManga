import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { OptionalJwtAuthGuard } from 'src/auth/guards/optional-jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { MangaService } from 'src/manga/manga.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { ChaptersService } from './chapters.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { SearchChapterDto } from './dto/search-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';

@Controller('chapters')
export class ChaptersController {
  constructor(
    private readonly chaptersService: ChaptersService,
    private readonly mangaService: MangaService,
  ) {}

  @Post()
  async create(@Body() dto: CreateChapterDto) {
    const manga = await this.mangaService.getMangaById(dto.mangaId);
    return this.chaptersService.create(dto, manga);
  }

  @Get('newest')
  @UseGuards(OptionalJwtAuthGuard)
  getNewestChapters(
    @Query() query: SearchChapterDto,
    @User() user: UserEntity,
  ) {
    return this.chaptersService.getNewestChapters(query, user);
  }

  @Get()
  @UseGuards(OptionalJwtAuthGuard)
  findAll(@Query() query: SearchChapterDto, @User() user: UserEntity) {
    return this.chaptersService.findAll(query, user);
  }

  @Get('count')
  getCount(@Query() query: SearchChapterDto) {
    return this.chaptersService.getCount(+query.mangaId);
  }

  @Get(':id')
  @UseGuards(OptionalJwtAuthGuard)
  findOne(@Param('id') id: string, @User() user: UserEntity) {
    return this.chaptersService.getCertainChapter(+id, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChapterDto: UpdateChapterDto) {
    return this.chaptersService.update(+id, updateChapterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chaptersService.remove(+id);
  }
}

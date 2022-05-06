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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { MangaService } from 'src/manga/manga.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { SearchBookmarkDto } from './dto/search-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';

@Controller('bookmarks')
export class BookmarksController {
  constructor(
    private readonly bookmarksService: BookmarksService,
    private readonly mangaService: MangaService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@User() user: UserEntity, @Body() dto: CreateBookmarkDto) {
    const manga = await this.mangaService.getMangaById(dto.mangaId);
    return this.bookmarksService.create(dto, user, manga);
  }

  @Get()
  async getByQuery(@Query() query: SearchBookmarkDto) {
    return this.bookmarksService.findByQuery(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookmarksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBookmarkDto) {
    return this.bookmarksService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookmarksService.remove(+id);
  }
}

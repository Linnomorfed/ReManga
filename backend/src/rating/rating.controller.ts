import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { MangaService } from 'src/manga/manga.service';

@Controller('rating')
export class RatingController {
  constructor(
    private readonly ratingService: RatingService,
    private readonly mangaService: MangaService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@User() user: UserEntity, @Body() dto: CreateRatingDto) {
    const manga = await this.mangaService.getMangaById(dto.mangaId);

    return this.ratingService.create(dto, user, manga);
  }

  @Get()
  findAll() {
    return this.ratingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ratingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRatingDto) {
    return this.ratingService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ratingService.remove(+id);
  }
}

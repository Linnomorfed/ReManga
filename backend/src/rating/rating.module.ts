import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingEntity } from './entities/rating.entity';
import { MangaModule } from 'src/manga/manga.module';

@Module({
  imports: [TypeOrmModule.forFeature([RatingEntity]), MangaModule],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}

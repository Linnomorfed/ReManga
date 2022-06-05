import { Module } from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { ChaptersController } from './chapters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChaptersEntity } from './entities/chapter.entity';
import { MangaModule } from 'src/manga/manga.module';

@Module({
  imports: [TypeOrmModule.forFeature([ChaptersEntity]), MangaModule],
  controllers: [ChaptersController],
  providers: [ChaptersService],
  exports: [ChaptersService],
})
export class ChaptersModule {}

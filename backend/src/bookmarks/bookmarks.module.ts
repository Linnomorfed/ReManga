import { Module } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { BookmarksController } from './bookmarks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookmarksEntity } from './entities/bookmark.entity';
import { MangaModule } from 'src/manga/manga.module';

@Module({
  imports: [TypeOrmModule.forFeature([BookmarksEntity]), MangaModule],
  controllers: [BookmarksController],
  providers: [BookmarksService],
})
export class BookmarksModule {}

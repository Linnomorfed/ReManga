import { Module } from '@nestjs/common';
import { MangaService } from './manga.service';
import { MangaController } from './manga.controller';
import { MangaEntity } from './entities/manga.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from 'src/files/files.module';
import { GenresModule } from 'src/genres/genres.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MangaEntity]),
    FilesModule,
    GenresModule,
    CategoriesModule,
  ],
  controllers: [MangaController],
  providers: [MangaService],
  exports: [MangaService],
})
export class MangaModule {}

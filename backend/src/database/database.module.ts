import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookmarksEntity } from 'src/bookmarks/entities/bookmark.entity';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { ChaptersEntity } from 'src/chapters/entities/chapter.entity';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import FileEnity from 'src/files/entities/file.entity';
import { GenresEntity } from 'src/genres/entities/genre.entity';
import { LikeEntity } from 'src/likes/entities/like.entity';
import { MangaEntity } from 'src/manga/entities/manga.entity';
import PageEntity from 'src/pages/entities/page.entity';
import { RatingEntity } from 'src/rating/entities/rating.entity';
import { RestrictionEntity } from 'src/restriction/entities/restriction.entity';
import { StatusEntity } from 'src/status/entities/status.entity';
import { TypesEntity } from 'src/types/entities/type.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        imports: [ConfigModule],
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        entities: [
          CommentEntity,
          MangaEntity,
          UserEntity,
          TypesEntity,
          CategoryEntity,
          GenresEntity,
          StatusEntity,
          RestrictionEntity,
          FileEnity,
          BookmarksEntity,
          RatingEntity,
          ChaptersEntity,
          PageEntity,
          LikeEntity,
        ],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}

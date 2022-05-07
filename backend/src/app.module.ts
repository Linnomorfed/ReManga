import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';

import 'dotenv/config';
import { UserModule } from './user/user.module';
import { MangaModule } from './manga/manga.module';
import { CommentsModule } from './comments/comments.module';
import { AuthModule } from './auth/auth.module';
import { TypesModule } from './types/types.module';
import { CategoriesModule } from './categories/categories.module';
import { GenresModule } from './genres/genres.module';
import { StatusModule } from './status/status.module';
import { RestrictionModule } from './restriction/restriction.module';
import { FilesModule } from './files/files.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { RatingModule } from './rating/rating.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    MangaModule,
    CommentsModule,
    AuthModule,
    TypesModule,
    CategoriesModule,
    GenresModule,
    StatusModule,
    RestrictionModule,
    FilesModule,
    BookmarksModule,
    RatingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

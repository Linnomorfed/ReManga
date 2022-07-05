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
import { ChaptersModule } from './chapters/chapters.module';
import { PagesModule } from './pages/pages.module';
import { LikesModule } from './likes/likes.module';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        AWS_REGION: Joi.string().required(),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        NODE_ENV: Joi.string().required().valid('development', 'production'),
        PORT: Joi.string().required(),
      }),
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
    ChaptersModule,
    PagesModule,
    LikesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

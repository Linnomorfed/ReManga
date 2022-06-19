import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { LikeEntity } from './entities/like.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChaptersModule } from '../chapters/chapters.module';

@Module({
  imports: [TypeOrmModule.forFeature([LikeEntity]), ChaptersModule],
  controllers: [LikesController],
  providers: [LikesService],
  exports: [LikesService],
})
export class LikesModule {}

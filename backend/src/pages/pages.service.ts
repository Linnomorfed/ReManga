import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { S3 } from 'aws-sdk';
import PageEntity from './entities/page.entity';
import { ChaptersService } from 'src/chapters/chapters.service';

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(PageEntity)
    private repository: Repository<PageEntity>,
    private chapterService: ChaptersService,
    private readonly configService: ConfigService,
  ) {}

  async uploadChapterFiles(chapterId: number, images: Express.Multer.File[]) {
    const result = await this.chapterService.findOne(+chapterId);

    for (const page of images) {
      const s3 = new S3();

      const uploadResult = await s3
        .upload({
          Bucket: this.configService.get('AWS_MANGA_CHAPTERS_BUCKET'),
          Body: page.buffer,
          Key: `${uuid()}`,
        })
        .promise();

      const newFile = this.repository.create({
        key: uploadResult.Key,
        url: uploadResult.Location,
        chapter: result,
      });

      this.repository.save(newFile);
    }
  }
}

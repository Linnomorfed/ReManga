import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { S3 } from 'aws-sdk';
import PageEntity from './entities/page.entity';
import { ChaptersEntity } from 'src/chapters/entities/chapter.entity';
import { ChaptersService } from 'src/chapters/chapters.service';

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(PageEntity)
    private repository: Repository<PageEntity>,
    private chapterService: ChaptersService,
    private readonly configService: ConfigService,
  ) {}

  async uploadChapterFiles(chapterId: number, dataBuffer: Buffer) {
    const result = await this.chapterService.findOne(+chapterId);

    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get('AWS_MANGA_CHAPTERS_BUCKET'),
        Body: dataBuffer,
        Key: `${uuid()}`,
      })
      .promise();

    const newFile = this.repository.create({
      key: uploadResult.Key,
      url: uploadResult.Location,
      chapter: result,
    });

    return this.repository.save(newFile);
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}

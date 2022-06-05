import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import FileEnity from './entities/file.entity';
import { v4 as uuid } from 'uuid';
import { S3 } from 'aws-sdk';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEnity)
    private repository: Repository<FileEnity>,
    private readonly configService: ConfigService,
  ) {}
  async uploadMangaImg(dataBuffer: Buffer) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get('AWS_MANGA_IMAGE_BUCKET'),
        Body: dataBuffer,
        Key: `${uuid()}`,
      })
      .promise();

    const newFile = this.repository.create({
      key: uploadResult.Key,
      url: uploadResult.Location,
    });
    await this.repository.save(newFile);

    return newFile;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}

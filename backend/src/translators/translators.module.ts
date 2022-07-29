import { Module } from '@nestjs/common';
import { TranslatorsService } from './translators.service';
import { TranslatorsController } from './translators.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranslatorEntity } from './entities/translator.entity';
import { UserModule } from 'src/user/user.module';
import { FilesModule } from 'src/files/files.module';
import { MembersModule } from 'src/members/members.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TranslatorEntity]),
    UserModule,
    FilesModule,
    MembersModule,
  ],
  controllers: [TranslatorsController],
  providers: [TranslatorsService],
  exports: [TranslatorsService],
})
export class TranslatorsModule {}

import { Module } from '@nestjs/common';
import { TranslatorsService } from './translators.service';
import { TranslatorsController } from './translators.controller';

@Module({
  controllers: [TranslatorsController],
  providers: [TranslatorsService]
})
export class TranslatorsModule {}

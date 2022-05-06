import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { StatusEntity } from './entities/status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([StatusEntity])],
  controllers: [StatusController],
  providers: [StatusService],
})
export class StatusModule {}

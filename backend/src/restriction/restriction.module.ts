import { Module } from '@nestjs/common';
import { RestrictionService } from './restriction.service';
import { RestrictionController } from './restriction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestrictionEntity } from './entities/restriction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RestrictionEntity])],
  controllers: [RestrictionController],
  providers: [RestrictionService],
})
export class RestrictionModule {}

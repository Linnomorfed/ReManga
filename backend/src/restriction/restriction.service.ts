import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestrictionDto } from './dto/create-restriction.dto';
import { UpdateRestrictionDto } from './dto/update-restriction.dto';
import { RestrictionEntity } from './entities/restriction.entity';

@Injectable()
export class RestrictionService {
  constructor(
    @InjectRepository(RestrictionEntity)
    private repository: Repository<RestrictionEntity>,
  ) {}
  create(dto: CreateRestrictionDto) {
    return this.repository.save(dto);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} restriction`;
  }

  update(id: number, updateRestrictionDto: UpdateRestrictionDto) {
    return `This action updates a #${id} restriction`;
  }

  remove(id: number) {
    return `This action removes a #${id} restriction`;
  }
}

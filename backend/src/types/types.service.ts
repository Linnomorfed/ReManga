import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { TypesEntity } from './entities/type.entity';

@Injectable()
export class TypesService {
  constructor(
    @InjectRepository(TypesEntity)
    private repository: Repository<TypesEntity>,
  ) {}
  create(dto: CreateTypeDto) {
    return this.repository.save(dto);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} type`;
  }

  update(id: number, dto: UpdateTypeDto) {
    return `This action updates a #${id} type`;
  }

  remove(id: number) {
    return `This action removes a #${id} type`;
  }
}

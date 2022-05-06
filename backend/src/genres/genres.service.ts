import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { GenresEntity } from './entities/genre.entity';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(GenresEntity)
    private repository: Repository<GenresEntity>,
  ) {}
  create(dto: CreateGenreDto) {
    return this.repository.save(dto);
  }

  findAll() {
    return this.repository.find();
  }
  findById(ids: Array<number>) {
    return this.repository.find({ where: { id: In(ids) } });
  }

  findOne(id: number) {
    return `This action returns a #${id} type`;
  }

  update(id: number, dto: UpdateGenreDto) {
    return `This action updates a #${id} type`;
  }

  remove(id: number) {
    return `This action removes a #${id} type`;
  }
}

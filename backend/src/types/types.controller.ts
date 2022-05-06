import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TypesService } from './types.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';

@Controller('filters/types')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Post()
  create(@Body() dto: CreateTypeDto) {
    return this.typesService.create(dto);
  }

  @Get()
  findAll() {
    return this.typesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTypeDto) {
    return this.typesService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typesService.remove(+id);
  }
}

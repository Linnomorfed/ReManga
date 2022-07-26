import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TranslatorsService } from './translators.service';
import { CreateTranslatorDto } from './dto/create-translator.dto';
import { UpdateTranslatorDto } from './dto/update-translator.dto';

@Controller('translators')
export class TranslatorsController {
  constructor(private readonly translatorsService: TranslatorsService) {}

  @Post()
  create(@Body() createTranslatorDto: CreateTranslatorDto) {
    return this.translatorsService.create(createTranslatorDto);
  }

  @Get()
  findAll() {
    return this.translatorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.translatorsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTranslatorDto: UpdateTranslatorDto,
  ) {
    return this.translatorsService.update(+id, updateTranslatorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.translatorsService.remove(+id);
  }
}

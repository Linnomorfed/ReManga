import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RestrictionService } from './restriction.service';
import { CreateRestrictionDto } from './dto/create-restriction.dto';
import { UpdateRestrictionDto } from './dto/update-restriction.dto';

@Controller('filters/restrictions')
export class RestrictionController {
  constructor(private readonly restrictionService: RestrictionService) {}

  @Post()
  create(@Body() createRestrictionDto: CreateRestrictionDto) {
    return this.restrictionService.create(createRestrictionDto);
  }

  @Get()
  findAll() {
    return this.restrictionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restrictionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRestrictionDto: UpdateRestrictionDto,
  ) {
    return this.restrictionService.update(+id, updateRestrictionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restrictionService.remove(+id);
  }
}

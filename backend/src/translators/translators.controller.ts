import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TranslatorsService } from './translators.service';
import { CreateTranslatorDto } from './dto/create-translator.dto';
import { UpdateTranslatorDto } from './dto/update-translator.dto';
import { User } from 'src/decorators/user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('translators')
export class TranslatorsController {
  constructor(private readonly translatorsService: TranslatorsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@User() user: UserEntity, @Body() dto: CreateTranslatorDto) {
    return this.translatorsService.create(dto, user.id);
  }
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  updateTeamImg(
    @User() user: UserEntity,
    @Body() body,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.translatorsService.updateTeamImg(+body.id, image.buffer);
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

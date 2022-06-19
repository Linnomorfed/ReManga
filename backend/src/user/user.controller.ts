import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('current')
  getProfile(@User() user: UserEntity) {
    return this.userService.findById(user.id);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.userService.getOneById(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @User() user: UserEntity,
    @Body() dto: UpdateUserDto,
  ) {
    console.log(user);
    console.log(dto);
    return this.userService.update(+id, dto, +user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('current')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

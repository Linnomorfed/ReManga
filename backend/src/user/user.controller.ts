import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('current')
  getProfile(@Request() req) {
    return this.userService.findById(req.user.id);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.userService.getOneById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('current')
  update(@Request() req, @Body() dto: UpdateUserDto) {
    return this.userService.update(+req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('current ')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

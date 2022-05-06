import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('registration')
  registration(@Body() dto: CreateUserDto) {
    return this.authService.registration({
      nickname: dto.nickname,
      email: dto.email,
      password: dto.password,
    });
  }
}

import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { EmailConfirmationGuard } from 'src/email/guards/emailConfirmation.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
  ) {}

  @UseGuards(EmailConfirmationGuard)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('registration')
  async registration(@Body() dto: CreateUserDto) {
    const user = await this.authService.registration(dto);
    await this.emailService.sendVerificationLink(dto.email);
    return user;
  }
}

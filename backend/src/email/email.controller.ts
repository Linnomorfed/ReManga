import {
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
  Post,
  UseGuards,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import ConfirmEmailDto from './dto/confirmEmail.dto';
import { EmailService } from './email.service';

@Controller('email')
@UseInterceptors(ClassSerializerInterceptor)
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('resend-confirmation-link')
  @UseGuards(JwtAuthGuard)
  async resendConfirmationLink(@User() user: UserEntity) {
    await this.emailService.resendConfirmationLink(user.id);
  }

  @Post('confirm-email')
  async confirm(@Query() confirmationData: ConfirmEmailDto) {
    const email = await this.emailService.decodeConfirmationToken(
      confirmationData.token,
    );
    await this.emailService.confirmEmail(email);
  }
}

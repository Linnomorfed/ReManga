import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ForgotPasswordDto } from 'src/auth/dto/forgot-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByConditions({ email, password });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  generateJwtToken(data: { id: number; email: string }) {
    const payload = { email: data.email, sub: data.id };
    return this.jwtService.sign(payload);
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) {
      throw new BadRequestException('Invalid email');
    }
  }

  async login(user: UserEntity) {
    try {
      const { password, ...userData } = user;
      const payload = { email: user.email, sub: user.id };
      return {
        ...userData,
        access_token: this.generateJwtToken(userData),
      };
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  async registration(dto: CreateUserDto) {
    try {
      const { password, ...user } = await this.userService.create(dto);

      return { ...user, access_token: this.generateJwtToken(user) };
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
}

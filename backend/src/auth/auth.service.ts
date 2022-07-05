import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ForgotPasswordDto } from 'src/auth/dto/forgot-password.dto';
import { PostgresErrorCode } from 'src/database/postgresErrorCodes.enum';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.userService.findByConditions({ email });
      await this.verifyPassword(password, user.password);
      user.password = undefined;
      return user;
    } catch (err) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async login(user: UserEntity) {
    try {
      const { password, ...userData } = user;
      return {
        ...userData,
        access_token: this.generateJwtToken(userData),
      };
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  generateJwtToken(data: { id: number; email: string }) {
    const payload = { email: data.email, sub: data.id };
    return this.jwtService.sign(payload);
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.userService.findByEmail(dto.email);
    //...
    if (!user) {
      throw new BadRequestException('Invalid email');
    }
  }

  async registration(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    try {
      const { password, ...user } = await this.userService.create({
        ...dto,
        password: hashedPassword,
      });

      const access_token = await this.generateJwtToken(user);

      return { ...user, access_token };
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

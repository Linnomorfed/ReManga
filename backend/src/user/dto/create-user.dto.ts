import { IsEmail, Length } from 'class-validator';
import { UniqueOnDatabase } from 'src/auth/validations/UniqueValidation';
import { UserEntity } from '../entities/user.entity';

export class CreateUserDto {
  @Length(3, 32)
  nickname: string;

  @IsEmail()
  @UniqueOnDatabase(UserEntity)
  email: string;

  @Length(6, 32)
  password?: string;
}

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const data = { id: payload.sub, email: payload.email };

    const { password, ...userData } = await this.userService.findByConditions(
      data,
    );

    if (!userData) {
      throw new UnauthorizedException(
        'You do not have permission to access this page',
      );
    }

    return {
      id: userData.id,
      email: userData.email,
      nickname: userData.nickname,
    };
  }
}

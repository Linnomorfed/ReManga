import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'dWKrIhRDCO92oWiHVfXLE8mqy',
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

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

import { UsersRepository } from './users/user.repository';
import { JwtPayload } from './model/jwt-token.model';
import { User } from './users/user.entity';

// calling super and passing same secret key as in auth.module.ts and
// extracting accessToken from header as Bearer token
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private usersRepository: UsersRepository,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // pass username and password as payload and and check if user exists in db
  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user: User = await this.usersRepository.findOne({
      where: { username: username },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

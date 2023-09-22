import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersRepository } from './users/user.repository';
import { JwtPayload } from './model/jwt-token.model';
import { User } from './users/user.entity';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private usersRepository;
    private configService;
    constructor(usersRepository: UsersRepository, configService: ConfigService);
    validate(payload: JwtPayload): Promise<User>;
}
export {};

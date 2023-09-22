import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from './users/user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
export declare class AuthService {
    private usersRepository;
    private jwtService;
    private logger;
    constructor(usersRepository: UsersRepository, jwtService: JwtService);
    signUpUser(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    signInUser(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
}

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUpUser(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    signInUser(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
}

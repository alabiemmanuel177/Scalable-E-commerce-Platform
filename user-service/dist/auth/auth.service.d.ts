import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    login(user: User): Promise<{
        accessToken: string;
    }>;
    googleLogin(user: User): Promise<{
        accessToken: string;
    }>;
    validateOAuthLogin(profile: any): Promise<User>;
}

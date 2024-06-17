import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    register(createUserDto: CreateUserDto): Promise<{
        accessToken: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
    }>;
    googleAuth(req: any): Promise<void>;
    googleAuthRedirect(req: any, res: any): Promise<void>;
}

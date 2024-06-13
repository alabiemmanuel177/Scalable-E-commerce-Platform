import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './entities/role.entity';
import { UserProfile } from './entities/user-profile.entity';
import { User } from './entities/user.entity';
export declare class UserService {
    private userRepository;
    private roleRepository;
    private userProfileRepository;
    constructor(userRepository: Repository<User>, roleRepository: Repository<Role>, userProfileRepository: Repository<UserProfile>);
    findById(id: number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    create(createUserDto: CreateUserDto): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    validateUser(email: string, password: string): Promise<User>;
    createOAuthUser(profile: any): Promise<User>;
}

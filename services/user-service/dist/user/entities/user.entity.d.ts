import { Role } from './role.entity';
import { UserProfile } from './user-profile.entity';
export declare class User {
    id: number;
    username: string;
    email: string;
    password: string;
    role: Role;
    profile: UserProfile;
}

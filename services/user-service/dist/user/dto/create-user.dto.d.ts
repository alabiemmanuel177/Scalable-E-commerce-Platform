export declare class CreateUserDto {
    readonly username: string;
    readonly password: string;
    readonly firstName?: string;
    readonly lastName?: string;
    readonly email?: string;
    readonly phone?: string;
}
export declare class UpdateUserDto {
    readonly firstName?: string;
    readonly lastName?: string;
    readonly email?: string;
    readonly phone?: string;
}

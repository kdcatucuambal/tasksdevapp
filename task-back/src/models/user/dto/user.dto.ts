export class CreateUserDto {
    readonly name: string;
    readonly email: string;
    readonly password: string;
}

export class GetUserDto{
    readonly user: string;
    readonly email: string;
    readonly token: string;
}
import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {

    }

    /**
     * 
     * @param login: User credentials
     * @returns token for the user
     */
    @Post("login")
    async login(@Body() login: LoginDto) {
        try {
            return await this.authService.login(login);
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
}

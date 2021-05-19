import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { User } from 'src/models/user/schemas/user.schema';
import { UserService } from 'src/models/user/user.service';
import { LoginDto } from './dtos/login.dto';
import { UserLogged } from './dtos/userLogged.dto';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }


    async login(user: LoginDto) {

        let userFound: User = null;

        try {
            userFound = await this.userService
                .findByEmail(user.email);
        } catch (error) {
            throw new HttpException('Credentials are incorrect!',
                HttpStatus.BAD_REQUEST);
        }

        if (user === null) {
            throw new HttpException('Something goes wrong!',
                HttpStatus.BAD_REQUEST);
        }

        const isPassValid = compareSync(
            user.password,
            userFound.password);

        if (!isPassValid) {
            throw new HttpException('Credentials are incorrect!',
                HttpStatus.BAD_REQUEST);
        }
        const payload = {
            email: userFound.email,
            _id: userFound._id
        }
        const token = this.jwtService.sign(payload);
        const userLogged: UserLogged = {
            user: userFound.name,
            email: userFound.email,
            token: token,

        }
        return userLogged;

    }


}

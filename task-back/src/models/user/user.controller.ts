import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from 'src/auth/auth.decorator';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(private userService: UserService) {

    }

    @Get()
    async getAll() {
        const users = await this.userService.findAll();
        return users;
    }

    @Get('logged')
    @UseGuards(AuthGuard('jwt'))
    async getById(@Auth() userId: string) {
        try {
            const userFound = await this.userService.findById(userId);
            return userFound;
        } catch (error) {
            throw new HttpException('THere is no that user', HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    async create(@Body() user: CreateUserDto) {
        try {
            const userCreated = await this.userService.create(user);
            return userCreated;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Put(":id")
    async update(@Param("id") id: string, @Body() user: CreateUserDto) {
        try {
            const userUpdated = await this.userService.update(id, user);
            return userUpdated;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(":id")
    async delete(@Param("id") id: string) {
        try {
            const res = await this.userService.delete(id);
            return { deletedCount: res.deletedCount }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}





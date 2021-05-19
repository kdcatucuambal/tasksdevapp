import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { genSaltSync, hashSync } from "bcryptjs";
@Injectable()
export class UserService {

    constructor(@InjectModel('User') private userModel: Model<UserDocument>) {

    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);

        const password = createdUser.password.trim();
        if (password.length < 8) {
            throw { message: "The password must be a minimum of 8 characters" }
        }

        const salt = genSaltSync(10);
        createdUser.password = hashSync(password, salt);
        return createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find();
    }

    async findByEmail(email: string): Promise<User> {
        return this.userModel.findOne({ email }).exec();
    }

    async findById(id: string): Promise<User> {
        return this.userModel.findById(id).exec();
    }

    async update(id: string, updateUser: CreateUserDto): Promise<User> {
        const r = this.userModel.findByIdAndUpdate(id, updateUser, { new: true, runValidators: true }).exec();
        return r;
    }

    async delete(id: string): Promise<any> {
        return this.userModel.deleteOne({ _id: id }).exec();
    }
}


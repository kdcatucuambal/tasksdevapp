import { HttpException, HttpStatus } from "@nestjs/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';


export type UserDocument = User & Document;

@Schema()
export class User {

    _id: string;

    @Prop({ trim: true, required: true })
    name: string;

    @Prop({ trim: true, unique: true, match: /.+\@.+\..+/, required: true })
    email: string;

    @Prop({
        trim: true, minlength: 8, required: true
    })
    password: string;

    @Prop({ default: Date.now() })
    createdAt: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);

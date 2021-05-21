import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Task & Document;

@Schema()
export class Task {

    _id: string;

    @Prop()
    name: string;

    @Prop()
    state: boolean;

    //To do relations

}

export const ProjectSchema = SchemaFactory.createForClass(Task);
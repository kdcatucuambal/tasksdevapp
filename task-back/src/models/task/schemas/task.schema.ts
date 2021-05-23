import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {

    _id: string;

    @Prop({ required: true, trim: true })
    name: string;

    @Prop({ required: true, default: false })
    state: boolean;

    @Prop({ default: Date })
    createdAt: Date;

    @Prop({ required: true, type: Types.ObjectId, ref: 'Project' })
    project: Types.ObjectId;

}

export const TaskSchema = SchemaFactory.createForClass(Task);
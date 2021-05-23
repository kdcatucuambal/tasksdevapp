import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaR, Types } from 'mongoose';
import * as mongoose from 'mongoose';


export type ProjectDocument = Project & mongoose.Document;

@Schema()
export class Project {

  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ default: Date })
  createdAt: Date;

}



export const ProjectSchema = SchemaFactory.createForClass(Project);

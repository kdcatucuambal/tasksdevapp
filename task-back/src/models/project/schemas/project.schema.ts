import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document, Schema as SchemaR } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from "./../../user/schemas/user.schema";

export type ProjectDocument = Project & mongoose.Document;

@Schema()
export class Project {

  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'User' })
  user: mongoose.Types.ObjectId

}



export const ProjectSchema = SchemaFactory.createForClass(Project);

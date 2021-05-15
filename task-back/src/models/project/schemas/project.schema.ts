import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  _id: string;
  @Prop()
  name: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);

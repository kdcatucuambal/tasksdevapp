import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dtos/project.dto';
import { Project, ProjectDocument } from './schemas/project.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel('Project') private projectModel: Model<ProjectDocument>,
  ) { }

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const createdProject = new this.projectModel(createProjectDto);
    return createdProject.save();
  }

  async findAll(): Promise<Project[]> {
    return this.projectModel.find().exec();
  }

  async findById(id: string): Promise<Project> {
    return this.projectModel.findById(id).exec();
  }

  async update(id: string, updateProject: CreateProjectDto): Promise<Project> {
    const r = this.projectModel.findByIdAndUpdate(id, updateProject, { new: true }).exec();
    return r;
  }

  async delete (id: string): Promise<any>{
    return this.projectModel.deleteOne({_id: id}).exec();
  }
}
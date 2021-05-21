import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/schemas/user.schema';
import { UserService } from '../user/user.service';
import { CreateProjectDto } from './dtos/project.dto';
import { Project, ProjectDocument } from './schemas/project.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel('Project') private projectModel: Model<ProjectDocument>,
    private userService: UserService
  ) { }

  async create(createProjectDto: CreateProjectDto): Promise<Project> {

    let user: User = null;

    try {
      user = await this.userService.findById(createProjectDto.user);
    } catch (error) {
      throw { message: "User not found!" }
    }

    const project = {
      name: createProjectDto.name,
      user
    }

    const createdProject = new this.projectModel(createProjectDto);
    return createdProject.save();
  }

  async findAll(userId: string): Promise<Project[]> {
    const user = mongoose.Types.ObjectId(userId);
    console.log('user: ', user);

    return this.projectModel.find({ user }).populate("user").exec();
  }

  async findById(id: string): Promise<Project> {

    //return this.projectModel.findById(id).populate("user").exec();
    return this.projectModel.findById(id).exec();
  }

  async update(id: string, updateProject: CreateProjectDto): Promise<Project> {
    const r = this.projectModel.findByIdAndUpdate(id, { name: updateProject.name }, { new: true }).exec();
    return r;
  }

  async delete(id: string): Promise<any> {
    return this.projectModel.deleteOne({ _id: id }).exec();
  }
}

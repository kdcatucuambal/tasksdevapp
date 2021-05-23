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

  async create(createProjectDto: CreateProjectDto, userId: string): Promise<Project> {

    let user: User = null;

    try {
      user = await this.userService.findById(userId);
    } catch (error) {
      throw { message: "User not found!" }
    }

    const project = {
      name: createProjectDto.name,
      user
    }

    const createdProject = new this.projectModel(project);

    const projectSaved = await createdProject.save();
    projectSaved.user = projectSaved.user['_id'];

    return projectSaved;
  }

  async findAll(userId: string): Promise<Project[]> {
    const user = mongoose.Types.ObjectId(userId);
    // return this.projectModel.find({ user }).populate("user").exec();
 
    return this.projectModel.find({ user }).sort({ createdAt: -1 }).exec();
  }

  async findById(id: string, userId: string): Promise<Project> {

    //return this.projectModel.findById(id).populate("user").exec();
    const projectFound = await this.projectModel.findOne({
      _id: mongoose.Types.ObjectId(id),
      user: mongoose.Types.ObjectId(userId)
    }).exec();

    if (projectFound === null) {
      throw { message: "Permissions denied" }
    }

    return projectFound;
  }

  async update(id: string, updateProject: CreateProjectDto, userId: string): Promise<Project> {

    const projUpdated = await this.projectModel.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(id),
        user: mongoose.Types.ObjectId(userId)
      }, { name: updateProject.name }, { new: true })

    if (projUpdated === null) {
      throw { message: "Permissions denied" }
    }

    return projUpdated;
  }

  async delete(id: string, userId: string): Promise<{ deleted: number }> {
    const deleted = await this.projectModel.deleteOne(
      { _id: id, user: mongoose.Types.ObjectId(userId) }).exec();

    return { deleted: deleted.deletedCount };
  }
}

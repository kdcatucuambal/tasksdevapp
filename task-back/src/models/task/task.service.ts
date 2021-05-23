import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProjectService } from '../project/project.service';
import { CreateTaskDto } from './dtos/task.dto';
import { Task } from './schemas/task.schema';



@Injectable()
export class TaskService {

    constructor(
        @InjectModel('Task') private taskModel: Model<Task>,
        private projectService: ProjectService) { }

    async create(taskDto: CreateTaskDto, userId: string) {

        const project = await this.projectService.findById(taskDto.project, userId);

        if (project === null) {
            throw { message: "Permissions denied" }
        }

        const taskCreated = new this.taskModel({ project, name: taskDto.name });
        const taskSaved = await taskCreated.save();
        taskSaved.project = taskSaved.project['_id'];
        return taskSaved;

    }

    async findAllByProject(projectId: string, userId: string) {

        const project = await this.projectService.findById(projectId, userId);

        if (project === null) {
            throw { message: "Permissions denied" }
        }

        const tasks = await this.taskModel.find({ project: Types.ObjectId(projectId) }).exec();

        return tasks;
    }

    async findById(taskId: string, userId: string) {
        const taskFound = await this.taskModel.findById(taskId);

        if (taskFound === null) {
            throw { message: "Permissions denied" }
        }

        const project = await this.projectService.findById(String(taskFound.project), userId);
        if (project === null) {
            throw { message: "Permissions denied" }
        }

        return taskFound;

    }

    async update(taskDto: CreateTaskDto, taskId: string, userId: string) {
        const taskFound = await this.taskModel.findById(taskId);
        if (taskFound === null) {
            throw { message: "Permissions denied" }
        }
        const project = await this.projectService.findById(String(taskFound.project), userId);
        if (project === null) {
            throw { message: "Permissions denied" }
        }

        return this.taskModel.findByIdAndUpdate(taskId, { name: taskDto.name }, { new: true }).exec();


    }

    async updateState(taskId: string, state: boolean, userId: string) {
        const taskFound = await this.taskModel.findById(taskId);
        if (taskFound === null) {
            throw { message: "Permissions denied" }
        }
        const project = await this.projectService.findById(String(taskFound.project), userId);
        if (project === null) {
            throw { message: "Permissions denied" }
        }
        return this.taskModel.findByIdAndUpdate(taskId, { state }, { new: true }).exec();
    }



    async delete(taskId: string, userId: string): Promise<{ deleted: number }> {
        const taskFound = await this.taskModel.findById(taskId);
        if (taskFound === null) {
            throw { message: "Permissions denied" }
        }
        const project = await this.projectService.findById(String(taskFound.project), userId);
        if (project === null) {
            throw { message: "Permissions denied" }
        }
        const deleted = await this.taskModel.deleteOne({ _id: taskId }).exec();
        return { deleted: deleted.deletedCount };
    }
}

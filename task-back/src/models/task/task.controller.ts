import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from 'src/auth/auth.decorator';
import { CreateTaskDto } from './dtos/task.dto';
import { TaskService } from './task.service';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TaskController {

    constructor(private taskService: TaskService) {

    }

    @Get(":project")
    async getAllByProject(@Param("project") projectId: string, @Auth() userId: string) {

        try {
            const tasks = await this.taskService.findAllByProject(projectId, userId);
            return tasks;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    async getById(@Query("taskid") taskId: string, @Auth() userId: string) {
        try {
            const task = await this.taskService.findById(taskId, userId);
            return task;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    async create(@Body() task: CreateTaskDto, @Auth() userId: string) {
        return await this.taskService.create(task, userId);
    }

    @Put(":task")
    async update(@Param("task") taskId: string,
        @Body() task: CreateTaskDto,
        @Auth() userId: string) {
        try {
            const taskUpdated = await this.taskService.update(task, taskId, userId);
            return taskUpdated;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Patch(":taskid")
    async updateState(
        @Param("taskid") taskId: string,
        @Body() { state }: { state: boolean },
        @Auth() userId: string) {
        try {
            const taskUpdated = await this.taskService.updateState(taskId, state, userId)
            return taskUpdated;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':taskid')
    async delete(@Param("taskid") taskId: string, @Auth() userId: string) {
        return await this.taskService.delete(taskId, userId);
    }


}

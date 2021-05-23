import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from 'src/auth/auth.decorator'

import { CreateProjectDto } from './dtos/project.dto';
import { ProjectService } from './project.service';

@Controller('projects')
@UseGuards(AuthGuard('jwt'))
export class ProjectController {

  constructor(private projectService: ProjectService) { }

  @Get()
  async getProjects(@Auth() userId: string) {
    const projects = await this.projectService.findAll(userId);
    return projects;
  }

  @Get(':id')
  async getProjectyById(@Param("id") id: string, @Auth() userId: string) {
    try {
      const project = await this.projectService.findById(id, userId);
      return project;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  async create(@Body() project: CreateProjectDto, @Auth() userId: string) {
    const projectCreated = await this.projectService.create(project, userId);
    return projectCreated;
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() project: CreateProjectDto,
    @Auth() userId: string) {


    try {
      const projectUpdated = await this.projectService.update(id, project, userId);
      return projectUpdated;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

  }

  @Delete(':id')
  async delete(@Param("id") id: string, @Auth() userId: string) {
    return await this.projectService.delete(id, userId);
  }


}

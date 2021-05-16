import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProjectDto } from './dtos/project.dto';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) { }

  @Get()
  async getProjects() {
    const projects = await this.projectService.findAll();
    return projects;
  }

  @Get(':id')
  async getProjecyById(@Param("id") id: string) {
    const project = await this.projectService.findById(id);
    return project;
  }

  @Post()
  async create(@Body() project: CreateProjectDto) {
    const projectCreated = await this.projectService.create(project);
    return projectCreated;
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() project: CreateProjectDto) {
    const projectUpdated = await this.projectService.update(id, project);
    return projectUpdated;
  }

  @Delete(':id')
  async delete(@Param("id") id: string) {
    return await this.projectService.delete(id);
  }


}

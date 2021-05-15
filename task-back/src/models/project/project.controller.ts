import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProjectDto } from './dtos/project.dto';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  async getProjects() {
    const projects = await this.projectService.findAll();
    return projects;
  }

  @Post()
  async create(@Body() project: CreateProjectDto) {
    const projectCreated = await this.projectService.create(project);

    return projectCreated;
  }

  @Get('/test')
  getTest() {
    return 'Hello projects';
  }
}

import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAll(
    @Query('q') query?: string,
    @Query('completed') completed?: string,)
    {
    if (query) {
      return this.tasksService.searchTasks(query);
    }
    if (completed !== undefined) {
      return this.tasksService.filterTasksByStatus(completed === 'true');
    }
    return this.tasksService.getAllTasks();
  }

  @Post()
  async create(@Body() body: { title: string; description: string }) {
    await this.tasksService.createTask(body.title, body.description);
    return { message: 'Task created' };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { title: string; description: string; isCompleted: boolean },
  ) {
    await this.tasksService.updateTask(id, body.title, body.description, body.isCompleted);
    return { message: 'Task updated' };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.tasksService.deleteTask(id);
    return { message: 'Task deleted' };
  }
}

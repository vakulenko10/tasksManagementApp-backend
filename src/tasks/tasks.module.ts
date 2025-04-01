import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService, DatabaseService],
})
export class TasksModule {}
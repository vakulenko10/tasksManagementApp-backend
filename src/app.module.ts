import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { MigrationService } from './database/migration.service';
import { TasksModule } from './tasks/tasks.module';
@Module({
  imports: [TasksModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService,MigrationService],
  exports: [DatabaseService],
})
export class AppModule {}

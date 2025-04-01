import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class TasksService {
  constructor(private readonly db: DatabaseService) {}

  async getAllTasks(): Promise<any[]> {
    const res = await this.db.getClient().query('SELECT * FROM tasks ORDER BY id');
    return res.rows;
  }

  async createTask(title: string, description: string): Promise<void> {
    await this.db.getClient().query(
      'INSERT INTO tasks (title, description, is_completed) VALUES ($1, $2, false)',
      [title, description],
    );
  }

  async updateTask(id: string, title: string, description: string, isCompleted: boolean): Promise<void> {
    await this.db.getClient().query(
      'UPDATE tasks SET title = $1, description = $2, is_completed = $3 WHERE id = $4',
      [title, description, isCompleted, id],
    );
  }

  async deleteTask(id: string): Promise<void> {
    await this.db.getClient().query('DELETE FROM tasks WHERE id = $1', [id]);
  }
}

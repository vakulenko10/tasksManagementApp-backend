import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DatabaseService } from './database.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MigrationService implements OnApplicationBootstrap {
  constructor(private readonly db: DatabaseService) {}

  async onApplicationBootstrap() {
    const client = this.db.getClient();

    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const migrationName = '000_init.sql';
    const alreadyRun = await client.query(
      'SELECT 1 FROM migrations WHERE name = $1',
      [migrationName],
    );

    if (alreadyRun.rowCount > 0) {
      console.log(` Migration "${migrationName}" already applied`);
      return;
    }

    const filePath = path.join(__dirname, '../../migrations/000_init.sql');
    const sql = fs.readFileSync(filePath, 'utf8');

    try {
      await client.query(sql);
      await client.query('INSERT INTO migrations (name) VALUES ($1)', [migrationName]);
      console.log(`Migration "${migrationName}" applied successfully`);
    } catch (error) {
      console.error(` Migration "${migrationName}" failed:`, error.message);
    }
  }
}

// src/pre-bootstrap.ts
import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

export async function ensureDatabaseExists() {
  const dbName = process.env.DB_NAME;

  const client = new Client({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    database: 'postgres', // connect to default system DB
  });

  try {
    await client.connect();
    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName],
    );

    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`✅ Database "${dbName}" created.`);
    } else {
      console.log(`ℹ️ Database "${dbName}" already exists.`);
    }
  } catch (err) {
    console.error('❌ Error creating database:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

import 'reflect-metadata';
import { join } from 'path';
import { DataSource } from 'typeorm';

const entities = join(__dirname, '../**/*.entity.{js,ts}');

export const AppDataSourceTest = new DataSource({
  type: 'better-sqlite3',
  database: ':memory:',
  entities: [entities],
  dropSchema: true,
  logging: process.env.LOGGING === 'true' ? true : false,
  synchronize: process.env.SYNCHRONIZE === 'true' ? true : false,
  migrationsRun: process.env.MIGRATIONSRUN === 'true' ? true : false,
});

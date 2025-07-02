import 'reflect-metadata';
import dotenv from 'dotenv';
import { join } from 'path';
import { DataSource } from 'typeorm';

dotenv.config();

const entities = join(__dirname, '../**/*.entity.{js,ts}');
const migrations = join(__dirname, '../migrations/*.{js,ts}');

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  synchronize: process.env.SYNCHRONIZE === 'false' ? false : true,
  logging: process.env.LOGGING === 'false' ? false : true,
  entities: [entities],
  migrations: [migrations],
  subscribers: [],
});

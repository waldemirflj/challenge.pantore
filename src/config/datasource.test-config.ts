import { DataSource } from 'typeorm';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { User } from '../modules/users/user.entity';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const entities = join(__dirname, '../modules/**/*.entity.{js,ts}');

export const AppDataSourceTest = new DataSource({
  type: 'better-sqlite3',
  database: ':memory:',
  entities: [User],
  dropSchema: true,
  logging: process.env.LOGGING === 'true' ? true : false,
  synchronize: process.env.SYNCHRONIZE === 'true' ? true : false,
  migrationsRun: process.env.MIGRATIONSRUN === 'true' ? true : false,
});

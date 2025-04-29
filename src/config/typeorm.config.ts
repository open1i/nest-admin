import { DataSourceOptions } from 'typeorm';
import { User } from '../users/user.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const typeormConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
  ssl: false,
};
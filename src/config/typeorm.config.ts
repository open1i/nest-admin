import { DataSource } from 'typeorm';
import { User } from '../users/user.entity';
import * as dotenv from 'dotenv';

dotenv.config(); // 显式加载.env文件

console.log('process.env.DB_HOST', process.env.DB_HOST);
console.log('process.env.DB_PORT', process.env.DB_PORT);
console.log('process.env.DB_USER', process.env.DB_USER);
console.log('process.env.DB_PASSWORD', process.env.DB_PASSWORD);
const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: true,
  ssl: false,
});

export default dataSource;
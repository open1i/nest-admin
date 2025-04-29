import { DataSource } from 'typeorm';
import { seedUsers } from './user.seed';
import {typeormConfig} from '../../config/typeorm.config';

async function runSeeds() {
  // 直接使用typeormConfig创建DataSource
  const dataSource = new DataSource(typeormConfig);
  await dataSource.initialize();
  
  try {
    console.log('⏳ 开始执行数据种子...');
    await seedUsers(dataSource);
    console.log('✅ 数据种子执行完成');
  } catch (error) {
    console.error('❌ 数据种子执行失败:', error);
  } finally {
    await dataSource.destroy();
  }
}

runSeeds();
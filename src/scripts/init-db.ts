import { DataSource } from 'typeorm';
import { typeormConfig } from '../config/typeorm.config';

async function initializeDatabase() {
  const dataSource = new DataSource(typeormConfig);
  await dataSource.initialize();
  
  try {
    console.log('⏳ 正在初始化数据库表结构...');
    await dataSource.synchronize();
    console.log('✅ 数据库表结构初始化完成');
  } catch (error) {
    console.error('❌ 数据库初始化失败:', error);
  } finally {
    await dataSource.destroy();
  }
}

initializeDatabase();
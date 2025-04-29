import { Client } from 'pg';
import * as dotenv from 'dotenv';

// 加载.env文件配置
dotenv.config();

const testConnection = async () => {
  // 从环境变量获取配置
  const dbConfig = {
    host: process.env.DB_HOST || 'aws-0-ap-southeast-1.pooler.supabase.com',
    port: parseInt(process.env.DB_PORT || '6543'),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'postgres'
  };

  console.log('正在使用以下数据库配置:', dbConfig);

  const client = new Client({
    ...dbConfig,
    ssl: {
      rejectUnauthorized: false
    },
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 30000,
    max: 20
  });

  try {
    console.log('⏳ 正在连接数据库...');
    await client.connect();
    console.log('✅ 数据库连接成功');
    
    const result = await client.query('SELECT 1+1 AS result');
    console.log('🔍 测试查询结果:', result.rows);
    
    await client.end();
    console.log('🛑 数据库连接已关闭');
  } catch (error) {
    console.error('❌ 数据库连接失败:', error.message);
  }
};

testConnection();
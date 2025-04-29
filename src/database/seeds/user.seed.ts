import { DataSource } from 'typeorm';
// import { User } from '@/users/user.entity';
import { User } from '../../users/user.entity'
import * as bcrypt from 'bcryptjs'; // 修改为bcryptjs

export async function seedUsers(dataSource: DataSource) {
  const userRepository = dataSource.getRepository(User);
  
  const users = [
    {
      username: 'admin',
      password: await bcrypt.hash('admin123', 10),
      email: 'admin@example.com',
      roles: ['admin']
    },
    {
      username: 'user',
      password: await bcrypt.hash('user123', 10),
      email: 'user@example.com',
      roles: ['user']
    }
  ];

  await userRepository.save(users);
}
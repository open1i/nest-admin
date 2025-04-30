import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    console.log('userservice username', username);
    console.log('userservice password', password);
    const user = await this.findByUsername(username);
    console.log('userservice user', user);
    
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }
}
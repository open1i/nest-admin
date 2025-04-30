import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'admin', description: '用户名' })
  username: string;

  @ApiProperty({ example: 'admin123', description: '密码' })
  password: string;
}
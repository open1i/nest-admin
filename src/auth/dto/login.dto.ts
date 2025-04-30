import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
// 缺少验证装饰器 ：虽然 LoginDto 定义了字段，但没有添加 class-validator 的验证装饰器（如 @IsNotEmpty() 、 @IsString() 等）。当使用 ValidationPipe 时，NestJS 期望 DTO 类中的属性有验证装饰器。
export class LoginDto {
  @ApiProperty({ example: 'admin', description: '用户名' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'admin123', description: '密码' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
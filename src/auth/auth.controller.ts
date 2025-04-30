import { Controller, Get, Post, Body, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('认证')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}


  @Get()
  @ApiOperation({ summary: '认证服务状态检查' })
  @ApiResponse({ status: 200, description: '服务正常运行' })
  getAuthStatus(): string {
    
    console.log('认证服务状态检查');
    return 'Auth service is running';
  }

  @ApiOperation({ summary: '用户登录' })
  @ApiResponse({ status: 200, description: '登录成功返回token' })
  @ApiResponse({ status: 401, description: '用户名或密码错误' })
  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Headers('user-agent') userAgent: string,
    @Headers('x-forwarded-for') ip: string
  ) {
    console.log('登录');
    console.log('登录请求头:', { userAgent, ip });
    console.log('Received body:', body);
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) {
      return { message: '用户名或密码错误' };
    }
    return this.authService.login(user);
  }

  @Post('test')
  @ApiOperation({ summary: '测试接口' })
  @ApiResponse({ status: 200, description: '测试成功' })
  async testEndpoint(@Body() body: any) {
    console.log('测试请求体:', body);
    return {
      status: 'success',
      message: '测试接口响应正常',
      receivedData: body
    };
  }
}
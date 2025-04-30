import { Controller, Get, Post, Body, Headers, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse as SwaggerResponse, ApiBody } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { ApiResponse, ApiCode } from '../common/dto/api-response.dto';

@ApiTags('认证')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @ApiOperation({ 
    summary: '认证服务状态检查',
    description: '用于检查认证服务是否正常运行'
  })
  @SwaggerResponse({ 
    status: 200, 
    description: '服务正常运行',
    type: String
  })
  getAuthStatus(): string {
    
    console.log('认证服务状态检查');
    return 'Auth service is running';
  }

  @Post('login')
  @ApiOperation({ 
    summary: '用户登录',
    description: '使用用户名和密码进行登录，成功返回JWT token'
  })
  @ApiBody({ 
    type: LoginDto,
    description: '登录凭证',
    examples: {
      admin: {
        summary: '管理员登录示例',
        value: { username: 'admin', password: 'admin123' }
      },
      user: {
        summary: '普通用户登录示例',
        value: { username: 'user', password: 'user123' }
      }
    }
  })
  @SwaggerResponse({ 
    status: 200, 
    description: '登录成功返回token',
    type: ApiResponse
  })
  @SwaggerResponse({ 
    status: 401, 
    description: '用户名或密码错误',
    type: ApiResponse
  })
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
      return new ApiResponse(
        ApiCode.INVALID_CREDENTIALS,
        '用户名或密码错误',
        null
      );
    }
    
    const loginResult = await this.authService.login(user);
    return new ApiResponse(
      ApiCode.SUCCESS,
      '登录成功',
      loginResult
    );
  }

  @Post('test')
  @ApiOperation({ 
    summary: '测试接口',
    description: '用于测试API连通性和请求响应'
  })
  @ApiBody({
    description: '测试请求体',
    examples: {
      basic: {
        summary: '基础测试',
        value: { test: 'hello' }
      }
    }
  })
  @SwaggerResponse({ 
    status: 200, 
    description: '测试成功',
    schema: {
      example: {
        status: 'success',
        message: '测试接口响应正常',
        receivedData: {}
      }
    }
  })
  async testEndpoint(@Body() body: any) {
    console.log('测试请求体:', body);
    return {
      status: 'success',
      message: '测试接口响应正常',
      receivedData: body
    };
  }
}
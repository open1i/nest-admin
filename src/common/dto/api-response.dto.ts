import { ApiProperty } from '@nestjs/swagger';

export class ApiResponse<T> {
  @ApiProperty({ description: '状态码', example: 200 })
  code: number;

  @ApiProperty({ description: '响应消息', example: '操作成功' })
  message: string;

  @ApiProperty({ description: '响应数据' })
  data?: T;

  constructor(code: number, message: string, data?: T) {
    this.code = code;
    this.message = message;
    this.data = data;
  }
}

// 预定义状态码
export enum ApiCode {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
  
  // 自定义业务状态码
  INVALID_CREDENTIALS = 1001,  // 用户名或密码错误
  ACCOUNT_DISABLED = 1002,     // 账户已禁用
  ACCOUNT_LOCKED = 1003,       // 账户已锁定
  LOGIN_TIMEOUT = 1004,        // 登录超时
}
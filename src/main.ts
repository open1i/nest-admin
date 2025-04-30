import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose']
  });
  // 添加CORS配置
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  // Swagger配置
  const config = new DocumentBuilder()
    .setTitle('Nest Admin API')
    .setDescription('The admin API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.log('⏳ 正在启动应用...');
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));
  
  app.setGlobalPrefix('api/v1',{
    exclude: ['auth']
  });
  await app.listen(process.env.PORT ?? 3000);
  console.log(`✅ 应用已启动，监听端口 ${process.env.PORT ?? 3000}`);
}
bootstrap();

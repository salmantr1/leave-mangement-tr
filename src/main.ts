import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const usersService = app.get(UsersService);
  await usersService.createAdmin();
  app.enableCors();

  // Enable validation
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Leave Management System')
    .setDescription('API docs for Employee and Admin')
    .addBearerAuth()
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();

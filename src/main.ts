/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
// Removed CallbackHandler import as it is not exported by '@vercel/node'

let server: any;

async function bootstrap(): Promise<any> {
  const app = await NestFactory.create(AppModule);
  const usersService = app.get(UsersService);
  await usersService.createAdmin();
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Leave Management System')
    .setDescription('API docs for Employee and Admin')
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);

  await app.init();
  return app.getHttpAdapter().getInstance();
}

// Only run listener locally
if (!process.env.VERCEL) {
  bootstrap().then((app) => {
    app.listen(process.env.PORT ?? 3000);
  });
}

// Vercel entry point
export default async function handler(...args: any[]) {
  server = server ?? (await bootstrap());
  return server(...args);
}

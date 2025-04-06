import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { graphqlUploadExpress } from 'graphql-upload-ts';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true, // Or specify your frontend URL
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  // Configure GraphQL Upload middleware
  app.use(graphqlUploadExpress({
    maxFileSize: 10000000, // 10MB
    maxFiles: 5,
  }));


  await app.listen(process.env.PORT);
}
bootstrap();

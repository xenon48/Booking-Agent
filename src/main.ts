import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PORT: number = 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // удаляет лишние поля
      // forbidNonWhitelisted: true, // кидает ошибку если есть лишние поля
      transform: true, // включает class-transformer
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Reservation API')
    .setDescription('API for seat reservations')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT, () => console.log(`\nServer is running on Port: ${PORT}\n`));
};



bootstrap();

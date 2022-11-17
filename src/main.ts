import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Valida informações enviadas com o DTO
      forbidNonWhitelisted: true, // não permite envio de valor não exitentes no DTO
      transform: true, // faz a tipagem dos dados enviado no payload com a definição do DTO
    }),
  );
  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { EntitynotFoundExceptionFilter } from './exceptions/filters/EntityNotFoundExceptionFilter';
import { NotFoundExceptionFilter } from './exceptions/filters/NotFoundExceptionFilter';
import { InvalidSomethingExceptionFilter } from './exceptions/filters/InvalidSomethingExceptionFilter';
import { MultStatusExceptionFilter } from './exceptions/filters/MultiStatusExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new EntitynotFoundExceptionFilter())
  app.useGlobalFilters(new NotFoundExceptionFilter())
  app.useGlobalFilters(new InvalidSomethingExceptionFilter())
  app.useGlobalFilters(new MultStatusExceptionFilter())

  app.useGlobalPipes(new ValidationPipe({errorHttpStatusCode: 422}))
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConflictInterceptor } from './common/errors/interceptors/Conflict.interceptor';
import { DataBaseInterceptor } from './common/errors/interceptors/DataBase.interceptor';
import { NotFoundInterceptor } from './common/errors/interceptors/NotFound.interceptor';
import { UnauhorizedInterceptor } from './common/errors/interceptors/Unauthorized.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Api Prisma NestJs')
    .setDescription(
      'Testando novas funcionalidade NestJs com Prisma Orm e postgres',
    )
    .setVersion('0.9')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  //app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ConflictInterceptor());
  app.useGlobalInterceptors(new DataBaseInterceptor());
  app.useGlobalInterceptors(new UnauhorizedInterceptor());
  app.useGlobalInterceptors(new NotFoundInterceptor());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configSwagger = new DocumentBuilder()
    .setTitle('API Usuarios')
    .setDescription('Este projeto é uma API de gerenciamento de usuários que permite criar, ler, atualizar e excluir usuários, além de gerenciar a hierarquia entre eles. A API é protegida por autenticação JWT.')
    .setVersion('1.0')
    .addBearerAuth()
    .setContact('Cintia Nomura', 'https://www.linkedin.com/in/cintia-masumi-nomura-3770a7b1/','nomura_masumi@hotmail.com')
    .build()

  const document = SwaggerModule.createDocument(app, configSwagger)
  SwaggerModule.setup('docs', app, document)
  app.use(cookieParser())
  app.use(session({
    secret: 'JWT_SECRET',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge:3600000, secure: false }
  }))
  await app.listen(3000);
}
bootstrap();

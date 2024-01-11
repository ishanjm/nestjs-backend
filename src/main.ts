import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import serverless = require('serverless-http');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  app.use(helmet());
  app.use(cookieParser());
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://example.com',
      'http://www.example.com',
      'http://app.example.com',
      'https://example.com',
      'https://www.example.com',
      'https://app.example.com',
    ],
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle('Backend API')
    .setDescription('All available API as follows')
    .setVersion('0.1')
    .addTag('API')
    .build();

  const globalPrefix = '/.netlify/functions/api';
  app.setGlobalPrefix(globalPrefix);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT);

  const expressApp = app.getHttpAdapter().getInstance();
  return serverless(expressApp);
  //module.exports.handler = serverless(app);
}

// let server;
// export const handler = async (event, context, callback) => {
//   server = server ?? (await bootstrap());
//   return server(event, context, callback);
// };

bootstrap();

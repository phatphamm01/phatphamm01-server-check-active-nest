import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { resolve } from 'path';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';

import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as express from 'express';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(server),
  );

  const httpsServer = https.createServer();

  const options = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  };
  app.enableCors(options);
  app.setBaseViewsDir(resolve('./public'));
  app.setViewEngine('hbs');

  await app.init();

  const PORT = process.env.PORT || 3000;
  http.createServer(server).listen(PORT);
  https.createServer(server).listen(443);
}
bootstrap();

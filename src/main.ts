import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1/');

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.use(
    session({
      name: 'Session has no name',
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,

      // TODO configure prod and dev enviroments, have samesite: true in prod
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // Seven days
      },

      //TODO Use redis to store sessions,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const configService = app.get(ConfigService);

  // Set up session middleware
  app.use(
    session({
      secret: 'your_secret_key', // Replace with a secure key
      resave: false,
      saveUninitialized: false,
    }),
  );

  // Initialize passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Passport serialization
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  await app.listen(configService.get('PORT'));
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

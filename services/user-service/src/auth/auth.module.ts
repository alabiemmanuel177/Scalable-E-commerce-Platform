import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { GoogleStrategy } from './strategy/oauth.strategy';
import { ConfigModule } from '@nestjs/config';
import { ProfileController } from './profile.controller';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.register({
      secret: 'your_secret_key',
      signOptions: { expiresIn: '1h' },
    }),
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController, ProfileController],
  providers: [AuthService, JwtStrategy, GoogleStrategy],
  exports: [AuthService, JwtStrategy, PassportModule],
})
export class AuthModule {}

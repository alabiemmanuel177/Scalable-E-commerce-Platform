import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { UserProfile } from './entities/user-profile.entity';
import { User } from './entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, UserProfile]), AuthModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

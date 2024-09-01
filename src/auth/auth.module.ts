/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from 'src/users/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [AuthService, UserRepository],
  controllers: [AuthController],
})
export class AuthModule {}

/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],

  controllers: [UsersController],
  exports: [TypeOrmModule],
  providers: [
    UsersService,
    UserRepository,
    CloudinaryConfig,
    CloudinaryService,
  ],
})
export class UsersModule {}

/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { FileUploadRepository } from './file-upload.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  providers: [FileUploadService, CloudinaryConfig, FileUploadRepository],
  controllers: [FileUploadController],
})
export class FileUploadModule {}


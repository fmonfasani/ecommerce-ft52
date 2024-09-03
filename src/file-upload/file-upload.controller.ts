/* eslint-disable prettier/prettier */
import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
@ApiTags('files')
@Controller('files')
@UseGuards(JwtAuthGuard) // Aquí usamos JwtAuthGuard para proteger el endpoint
@ApiBearerAuth() // Esto le indica a Swagger que este endpoint requiere autenticación JWT
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}
  @Post('uploadImage/:id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadImage(
    @Param('id') productId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000, // bytes
            message: 'File is too large',
          }),
          new FileTypeValidator({
            fileType: /jpg|jpeg|gif|png|webp|svg/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileUploadService.uploadImage(productId, file); // Aquí iría la lógica para manejar la subida del archivo
  }
}

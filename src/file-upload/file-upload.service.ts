/* eslint-disable prettier/prettier */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async uploadImage(productId: string, file: Express.Multer.File) {
    const product = await this.productsRepository.findOneBy({ id: productId });

    //? verifcamos si el prod existe
    if (!product)
      throw new NotFoundException(`Product with id ${productId} not found`);
    //? subida del file
    const uploadedImage = await this.fileUploadRepository.uploadImage(file);

    //? actualizamos el stock
    await this.productsRepository.update(productId, {
      imgUrl: uploadedImage.secure_url,
    });

    //? buscamos el producto
    return await this.productsRepository.findOneBy({
      id: productId,
    });
  }
}

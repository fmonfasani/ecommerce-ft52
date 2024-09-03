/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductsRepository) {}

  getProducts(page: number, limit: number) {
    return this.productRepository.getProducts(page, limit);
  }

  getProduct(id: string) {
    return this.productRepository.getProduct(id);
  }

  addProducts() {
    return this.productRepository.addProducts();
  }

  updateProductStock(id: string, stock: number) {
    return this.productRepository.updateProductStock(id, stock);
  }
}

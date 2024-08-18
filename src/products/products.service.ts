import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  getProducts(): string {
    return 'Devuelvo productos desde el controlador';
  }
}

import { Injectable } from '@nestjs/common';
import { ProductRepository, Product } from './products.repository';

@Injectable()
export class ProductsService {
  //Servicio que utiliza ProductRepository para obtener los productos.
  //Esta es una capa de abstracción que permite manejar lógica de negocio adicional si es necesario.
  constructor(private readonly productsRepository: ProductRepository) {}
  //Inyecta ProductRepository para que pueda ser utilizado dentro de la clase ProductsService.
  getProducts(): Product[] {
    return this.productsRepository.getproducts();
  }
}

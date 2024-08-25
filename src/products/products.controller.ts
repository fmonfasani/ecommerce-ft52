import { Controller, Get } from '@nestjs/common';
//Este paquete contiene decoradores y funcionalidades básicas de NestJS.
// Controller: Es un decorador que marca una clase como un controlador, que puede manejar solicitudes HTTP
// Get: Es un decorador que define un método HTTP GET en la ruta definida en el controlador.
import { ProductsService } from './products.service';
// Servicio que utiliza ProductRepository para obtener los productos.
import { Product } from './products.repository';
// Un array simulado de productos que actúa como una base de datos en memoria.

@Controller('products')
//Decorador que marca la clase como un controlador con la ruta base products.
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  // Inyecta ProductsService para acceder a la lógica de negocio.
  @Get() //Decorador de método que crea un manejador de rutas HTTP GET en la ruta definida en el controlador.
  getProducts(): Product[] {
    //Método que utiliza ProductsService para obtener y retornar los productos.
    return this.productsService.getProducts();
  }
}

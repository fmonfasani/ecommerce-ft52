import { Module } from '@nestjs/common';
// Decorador que define un módulo en NestJS. Los módulos organizan la aplicación y pueden contener componentes como controladores, servicios y más.
import { ProductsService } from './products.service';
// Servicio que encapsula la lógica de negocio relacionada con los productos, posiblemente utilizando ProductRepository para acceder y manipular datos de productos.
import { ProductsController } from './products.controller';
// Controlador que maneja las solicitudes HTTP para la ruta base 'products'. Utiliza ProductsService para procesar dichas solicitudes.
import { ProductRepository } from './products.repository';
// Repositorio que actúa como una fuente de datos para los productos,
// usando un array simulado de productos como una pseudo base de datos en memoria.

@Module({
  //Decorador que define un módulo de NestJS,
  //el cual es una clase con @Module() decorador.
  providers: [ProductsService, ProductRepository],
  //Aquí se incluyen los servicios y repositorios que pueden ser inyectados dentro de este módulo.
  controllers: [ProductsController],
  // Define qué controladores están incluidos en este módulo.
})
export class ProductsModule {}

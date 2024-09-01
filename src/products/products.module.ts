/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
// Decorador que define un módulo en NestJS. Los módulos organizan la aplicación y pueden contener componentes como controladores, servicios y más.
import { ProductsService } from './products.service';
// Servicio que encapsula la lógica de negocio relacionada con los productos, posiblemente utilizando ProductRepository para acceder y manipular datos de productos.
import { ProductsController } from './products.controller';
// Controlador que maneja las solicitudes HTTP para la ruta base 'products'. Utiliza ProductsService para procesar dichas solicitudes.
import { ProductsRepository } from './products.repository';
import { Products } from 'src/entities/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from 'src/entities/categories.entity';
// Repositorio que actúa como una fuente de datos para los productos,
// usando un array simulado de productos como una pseudo base de datos en memoria.

@Module({
  imports: [TypeOrmModule.forFeature([Products, Categories])],
  providers: [ProductsService, ProductsRepository],
  controllers: [ProductsController],
})
export class ProductsModule {}

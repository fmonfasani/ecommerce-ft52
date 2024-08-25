import { Injectable } from '@nestjs/common';
//Definición de la Interfaz Product
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imgUrl: string;
}

// creacion del Repositorio de Productos

@Injectable() // Decorador que marca la clase ProductRepository como un proveedor en NestJS,
// lo que significa que puede ser inyectado en otras  clases a través del sistema de inyección de dependencias de NestJS.
export class ProductRepository {
  //Clase que actúa como un repositorio para tus productos, almacenando y recuperando productos.
  private products = [
    //Un array simulado de productos que actúa como una base de datos en memoria.
    {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      price: 10,
      stock: 10,
      imgUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description 2',
      price: 20,
      stock: 20,
      imgUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Description 3',
      price: 30,
      stock: 30,
      imgUrl: 'https://via.placeholder.com/150',
    }, // Esta es la llave que cierra la lista de products
  ];

  getproducts() {
    return this.products; //Método que devuelve la lista de productos.
  }
}

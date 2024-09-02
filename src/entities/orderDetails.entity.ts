/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToOne,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { Products } from './products.entity';
import { Orders } from './orders.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity({
  name: 'orderdetails',
})
export class OrderDetails {
  /**
   * Identificador único de los detalles del pedido.
   * Es un UUID generado automáticamente.
   * @example "d290f1ee-6c54-4b01-90e6-d701748f0851"
   */
  @PrimaryGeneratedColumn('uuid')
  @ApiHideProperty()
  id: string;

  /**
   * Precio total del pedido.
   * Es un valor decimal con una precisión de hasta 10 dígitos y 2 decimales.
   * @example 199.99
   */
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  /**
   * Relación uno a uno con la entidad `Orders`.
   * Indica a qué pedido pertenecen estos detalles.
   * @example { "id": "1", "total": 299.99, "status": "completed" }
   */
  @OneToOne(() => Orders, (order) => order.orderDetails, { lazy: true })
  @JoinColumn({ name: 'order_id' })
  @ApiHideProperty()
  order: Orders;

  /**
   * Lista de productos asociados a estos detalles del pedido.
   * Relación muchos a muchos con la entidad `Products`.
   * @example [{ "id": "1", "name": "Smartphone" }, { "id": "2", "name": "Laptop" }]
   */
  @ManyToMany(() => Products, (product) => product.orderDetails, { lazy: true })
  @JoinTable({
    name: 'orderdetails_products', // Nombre de la tabla de unión
    joinColumn: {
      name: 'orderdetails_id', // Columna que hace referencia a esta entidad (OrderDetails)
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'product_id', // Columna que hace referencia a la otra entidad (Products)
      referencedColumnName: 'id',
    },
  })
  @ApiHideProperty()
  products: Products[];
}

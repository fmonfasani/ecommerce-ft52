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

@Entity({
  name: 'orderdetails',
})
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @OneToOne(() => Orders, (order) => order.orderDetails)
  @JoinColumn({ name: 'order_id' })
  order: Orders;

  @ManyToMany(() => Products, (product) => product.orderDetails)
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
  products: Products[];
}

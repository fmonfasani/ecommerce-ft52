/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { Categories } from './categories.entity';
import { OrderDetails } from './orderDetails.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class Products {
  /**
   * Identificador único del producto.
   * Es un UUID generado automáticamente.
   * @example "d290f1ee-6c54-4b01-90e6-d701748f0851"
   */
  @PrimaryGeneratedColumn('uuid')
  @ApiHideProperty()
  id: string;

  /**
   * Nombre del producto.
   * Debe ser único y tiene una longitud máxima de 50 caracteres.
   * @example "Laptop Gaming"
   */
  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: false,
  })
  name: string;

  /**
   * Descripción detallada del producto.
   * @example "Una laptop de alta gama ideal para gaming."
   */
  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;

  /**
   * Precio del producto.
   * Es un valor decimal con dos decimales.
   * @example 1299.99
   */
  @Column({
    type: 'decimal',
    nullable: false,
    default: 0,
    precision: 10,
    scale: 2,
  })
  price: number;

  /**
   * Cantidad de unidades disponibles en stock.
   * Es un valor entero.
   * @example 50
   */
  @Column({
    type: 'int',
    nullable: false,
  })
  stock: number;

  /**
   * URL de la imagen del producto.
   * Si no se especifica, se asigna una URL por defecto.
   * @example "https://example.com/product.jpg"
   */
  @Column({
    type: 'text',
    default:
      'https://st3.depositphotos.com/1001335/15303/i/1600/depositphotos_153033940-stock-photo-concept-of-warehouse-the-forklift.jpg',
  })
  imgUrl: string;

  /**
   * Relación muchos a uno con la entidad `Categories`.
   * Indica a qué categoría pertenece el producto.
   * @example { "id": "1", "name": "Electronics" }
   */
  @ManyToOne(() => Categories, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  @ApiHideProperty()
  category: Categories;

  /**
   * Relación muchos a muchos con la entidad `OrderDetails`.
   * Indica en qué detalles de pedidos se encuentra este producto.
   * @example [ { "id": "1", "price": 1299.99 }, { "id": "2", "price": 799.99 } ]
   */
  @ManyToMany(() => OrderDetails, (orderDetail) => orderDetail.products)
  @ApiHideProperty()
  orderDetails: OrderDetails[];
}

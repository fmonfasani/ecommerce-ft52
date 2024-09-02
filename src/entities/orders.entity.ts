/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Users } from './users.entity';
import { OrderDetails } from './orderDetails.entity';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity()
export class Orders {
  /**
   * Identificador único del pedido.
   * Es un UUID generado automáticamente.
   * @example "d290f1ee-6c54-4b01-90e6-d701748f0851"
   */
  @PrimaryGeneratedColumn('uuid')
  @ApiHideProperty()
  id: string;

  @ApiProperty({
    description: 'Debe ser la fecha tipo dd/mm/aaaa',
    example: '31/08/2024',
  })
  @Column()
  date: Date;

  /**
   * Relación uno a uno con la entidad `OrderDetails`.
   * Contiene los detalles específicos del pedido.
   * @example { "price": 299.99, "products": [...] }
   */
  @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
  @ApiHideProperty()
  orderDetails: OrderDetails;

  /**
   * Relación muchos a uno con la entidad `Users`.
   * Indica qué usuario realizó el pedido.
   * @example { "id": "1", "name": "John Doe" }
   */
  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  @ApiHideProperty()
  user: Users;
}

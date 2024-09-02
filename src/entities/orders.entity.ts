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
  
  @PrimaryGeneratedColumn('uuid')
  @ApiHideProperty()
  id: string;

  @ApiProperty({
    description: 'Debe ser la fecha tipo dd/mm/aaaa',
    example: '31/08/2024',
  })
  @Column()
  date: Date;
 
  @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order, { lazy: true })
  @ApiHideProperty()
  orderDetails: OrderDetails;

  @ManyToOne(() => Users, (user) => user.orders, { lazy: true })
  @JoinColumn({ name: 'user_id' })
  @ApiHideProperty()
  user: Users;
}

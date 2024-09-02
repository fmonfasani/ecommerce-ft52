/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Products } from './products.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Categories {
  
  @ApiProperty({
    description: 'ID de la categoria',
    example: 'b7520538-ff0b-4e76-92a2-c67f9d914f97',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nombre de la categoria',
    example: 'Electronics',
  })
  
  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
  })
  name: string;

 
  @OneToMany(() => Products, (product) => product.category, { lazy: true })
  @JoinColumn()
  products: Products[];
}

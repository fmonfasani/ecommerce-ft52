/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Products } from './products.entity';

@Entity()
export class Categories {
  /**
   * Identificador único de la categoría.
   * Es un UUID generado automáticamente.
   * @example "d290f1ee-6c54-4b01-90e6-d701748f0851"
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Nombre de la categoría.
   * Debe ser una cadena única con un máximo de 50 caracteres.
   * @example "Electronics"
   */
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

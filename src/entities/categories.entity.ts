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

  /**
   * Lista de productos asociados a esta categoría.
   * Relación uno a muchos con la entidad `Products`.
   * @example [{ "id": "1", "name": "Smartphone" }, { "id": "2", "name": "Laptop" }]
   */
  @OneToMany(() => Products, (product) => product.category)
  @JoinColumn()
  products: Products[];
}

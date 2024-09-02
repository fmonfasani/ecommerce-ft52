/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Orders } from './orders.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity({
  name: 'users',
})
export class Users {
  /**
   * Identificador único del usuario.
   * Es un UUID generado automáticamente.
   * @example "d290f1ee-6c54-4b01-90e6-d701748f0851"
   */
  @PrimaryGeneratedColumn('uuid')
  @ApiHideProperty()
  id: string;

  /**
   * Nombre completo del usuario.
   * Debe ser una cadena de texto con una longitud máxima de 50 caracteres.
   * @example "Juan Pérez"
   */
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  /**
   * Correo electrónico del usuario.
   * Debe ser único y tiene una longitud máxima de 50 caracteres.
   * @example "juan.perez@example.com"
   */
  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: false,
  })
  email: string;

  /**
   * Contraseña del usuario.
   * Se almacena como una cadena de texto con una longitud máxima de 128 caracteres.
   * @example "password123!"
   */
  @Column({
    type: 'varchar',
    nullable: false,
    length: 128,
  })
  password: string;

  /**
   * Número de teléfono del usuario.
   * Es un campo opcional.
   * @example 1234567890
   */
  @Column({
    type: 'int',
    nullable: true,
  })
  phone: number;

  /**
   * País de residencia del usuario.
   * Es un campo opcional con una longitud máxima de 50 caracteres.
   * @example "Argentina"
   */
  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  country: string;

  /**
   * Dirección del usuario.
   * Es un campo opcional.
   * @example "Calle Falsa 123"
   */
  @Column({
    type: 'text',
    nullable: true,
  })
  address: string;

  /**
   * Ciudad de residencia del usuario.
   * Es un campo opcional con una longitud máxima de 50 caracteres.
   * @example "Buenos Aires"
   */
  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  city: string;

  /**
   * Indica si el usuario tiene privilegios de administrador.
   * Es un valor booleano que por defecto es falso.
   * @example false
   */
  @Column({
    default: false,
  })
  isAdmin: boolean;

  /**
   * Relación uno a muchos con la entidad `Orders`.
   * Indica los pedidos realizados por el usuario.
   * @example [{ id: "1", date: "2024-09-01T10:00:00Z" }]
   */
  @OneToMany(() => Orders, (order) => order.user)
  @ApiHideProperty()
  orders: Orders[];
}

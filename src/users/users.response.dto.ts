import { Exclude, Expose } from 'class-transformer';

@Exclude() // Excluye todos los campos por defecto
export class UserResponseDto {
  @Expose() id: string;
  @Expose() name: string;
  @Expose() email: string;
  @Expose() address: string;
  @Expose() phone: number;
  @Expose() country: string;
  @Expose() city: string;
  // Otros campos que quieras exponer, excluyendo isAdmin
}

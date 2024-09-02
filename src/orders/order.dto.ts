import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Products } from 'src/entities/products.entity';

export class CreateOrderDto {
  /**
   * El ID del usuario que realiza la orden.
   * Debe ser un UUID válido.
   * @example "d290f1ee-6c54-4b01-90e6-d701748f0851"
   */
  @ApiProperty({
    description:
      'El ID del usuario que realiza la orden. Debe ser un UUID válido.',
    example: '8d261eb5-4f22-4b9c-b78a-549025b9b480',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    description:
      'Lista de productos que forman parte de la orden. Debe ser un array que contenga al menos un producto.',
    example: [
      { id: '8545042a-75da-4764-a55a-4d33a939c59d' },
      { id: '8545042a-75da-4764-a55a-4d33a939c59d' },
    ],
    type: [Products],
  })
  @IsArray()
  @ArrayMinSize(1)
  products: Partial<Products>[];
}

/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Products } from 'src/entities/products.entity';

export class CreateOrderDto {
  @ApiProperty({
    description: 'El ID del usuario que realiza la orden',
    example: '0b8ea231-3577-4731-8452-c83884a34800',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    description:
      'El array d elos productos deben ser de la forma {id, product_id}',
    example: [
      { id: '1e51aedf-ea07-49bb-b4cf-b3b326d37e46' },
      { id: '033ecb44-25b7-46c2-8264-e65950e60bd2' },
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  products: Partial<Products>[];
}

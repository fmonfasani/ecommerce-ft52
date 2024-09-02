import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Products } from 'src/entities/products.entity';

export class CreateOrderDto {
  
  @ApiProperty({
    description: 'El ID del usuario que realiza la orden',
    example: 'b7520538-ff0b-4e76-92a2-c67f9d914f97',  

  })  
  @IsNotEmpty()
  @IsUUID()
  userId: string;
  
  @ApiProperty({
    description: 'El array d elos productos deben ser de la forma {id, product_id}',
    example: [{id:'0a88d195-199d-440a-a840-bf576a5a7d7d'}, {id:'29af298f-67df-4d6a-be2d-6e9c26145b8c'}]

  })  

  @IsArray()
  @ArrayMinSize(1)
  products: Partial<Products>[];
}

import { ApiProperty, ApiHideProperty, PickType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
  IsNumber,
  Validate,
  IsEmpty,
} from 'class-validator';
import { MatchPassword } from 'src/decorators/matchPassword.decorator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Debe ser un string entre 3 y 50 caracteres.',
    example: 'Test User01',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description: 'El correo electrónico del usuario. Debe ser un email válido.',
    example: 'testuser02@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'La contraseña del usuario. Debe contener entre 8 y 15 caracteres, incluyendo al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&*).',
    example: 'Password123!',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
    message:
      'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*',
  })
  @MinLength(8)
  @MaxLength(15)
  password: string;

  @ApiProperty({
    description:
      'Confirmación de la contraseña del usuario. Debe coincidir con el campo `password`.',
    example: 'Password123!',
  })
  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;

  @ApiProperty({
    description:
      'La dirección del usuario. Debe ser un string entre 3 y 30 caracteres.',
    example: '123 Main Street',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  address: string;

  @ApiProperty({
    description: 'El número de teléfono del usuario. Debe ser un número.',
    example: 1234567890,
  })
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @ApiProperty({
    description:
      'El país de residencia del usuario. Debe ser un string entre 5 y 20 caracteres.',
    example: 'Brasil',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country: string;

  @ApiProperty({
    description:
      'La ciudad de residencia del usuario. Debe ser un string entre 5 y 20 caracteres.',
    example: 'Sao Pablo',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string;

  @ApiHideProperty()
  @IsEmpty()
  isAdmin?: boolean;
}

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}

import { PickType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
  IsNumber,
  Validate,
} from 'class-validator';
import { MatchPassword } from 'src/decorators/matchPassword.decorator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
    message:
      'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*',
  })
  @MinLength(8)
  @MaxLength(15)
  password: string;

  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  address: string;

  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string;
}

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}

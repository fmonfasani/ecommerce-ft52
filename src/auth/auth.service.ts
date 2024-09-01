/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { Users } from 'src/entities/users.entity';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/users/user.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  getAuth(): string {
    return 'Get auth';
  }

  async signIn(email: string, password: string) {
    if (!email || !password) return 'Data required';

    // Verificar que el usuario exista
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) throw new BadRequestException('Invalid Credentials');

    // Comparar las contraseñas
    const validPassword = await bcrypt.compare(password, user.password);

    console.log(validPassword);

    if (!validPassword) throw new BadRequestException('Invalid Credentials');

    // Firma del token
    const payload = {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    // Generación del token

    const token = this.jwtService.sign(payload);
    //? respuesta

    return {
      message: 'Login Successful',
      token,
    };
  }

  async signUp(user: Partial<Users>) {
    const { email, password } = user;

    // Verificar si el email está registrado en la DB:
    const foundUser = await this.userRepository.getUserByEmail(email);

    if (foundUser) throw new BadRequestException('Registered Email');

    // Proceso de registro:
    //* Hasheo de la password:
    const hashedPassword = await bcrypt.hash(password, 10);

    //* Guardarlo en la DB:
    return await this.userRepository.createUser({
      ...user,
      password: hashedPassword,
    });
  }
}

/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/users/user.repository';

@Injectable()
export class AuthService {
  userRepository: any;
  getAuth(): string {
    return 'autorizacion correcta'; //retornar "autorizacion aceptada"
  }

  async signIn(email: string, password: string) {
    if (!email || !password) return 'los datos son requeridos';

    const user = await this.userRepository.getUserByEmail(email);

    if (!user) return 'el usuario no existe';

    if (user.password === password) return 'login correcto';
    return 'credenciales incorrectas';
  }
}

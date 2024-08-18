import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUsers(): string {
    return 'Estoy devolviendo el servicio desde el controller';
  }
}

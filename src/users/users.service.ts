import { Injectable } from '@nestjs/common';
import { User, UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UserRepository) {}
  getUsers(): User[] {
    return this.usersRepository.getUsers(); //'Estoy devolviendo el servicio desde el controller';
  }
}

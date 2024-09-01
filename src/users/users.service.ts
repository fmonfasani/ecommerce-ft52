/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  getUsers(page: number, limit: number) {
    return this.userRepository.getUsers(page, limit);
  }

  getUser(id: string) {
    return this.userRepository.getUser(id);
  }

  createUser(user) {
    return this.userRepository.createUser(user);
  }

  updateUser(id: string, upUser) {
    return this.userRepository.updateUser(id, upUser);
  }

  deleteUser(id: string) {
    return this.userRepository.deleteUser(id);
  }
}

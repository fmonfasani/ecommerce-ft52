/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/users.entity';

@Injectable() //Marca la clase para inyección de dependencias.
export class UserRepository {
  constructor(
    @InjectRepository(Users) //Inyecta el repositorio de Users.
    private readonly usersRepository: Repository<Users>, //este respo permite usar Users, y lo guardamos en usersRepository
  ) {}

  async getUsers(page: number, limit: number) {
    //creamos la paginacion
    const skip = (page - 1) * limit; //calculamos la paginacion
    const users = await this.usersRepository.find({
      //buscamos los usuarios
      take: limit, //limitamos la paginacion
      skip: skip, //desde donde empieza la paginacion
    });
    return users.map(({ password, ...userNoPassword }) => userNoPassword); //retornamos la paginacion
  }

  async getUser(id: string) {
    //buscamos el usuario por id
    const user = await this.usersRepository.findOne({
      //buscamos el usuario
      where: { id }, //buscamos el usuario por id
      relations: { orders: true }, //buscamos el usuario con sus ordenes
    });
    if (!user) return `No se encontró el usuario con id ${id}`; //si no lo encontramos retornamos un error
    const { password, ...userNoPassword } = user; //si lo encontramos retornamos el usuario sin la password

    return userNoPassword; //retornamos el usuario sin la password
  }

  async createUser(user: Partial<Users>): Promise<Partial<Users>> {
    const newUser = await this.usersRepository.save(user);

    const dbUser = await this.usersRepository.findOneBy({ id: newUser.id });
    console.log(dbUser);

    const { password, ...userNoPassword } = dbUser;
    return userNoPassword;
  }

  async updateUser(id: string, user: Users): Promise<Partial<Users>> {
    await this.usersRepository.update(id, user);
    const updatedUser = await this.usersRepository.findOneBy({ id });
    const { password, ...userNoPassword } = updatedUser;

    return userNoPassword;
  }

  async deleteUser(id: string): Promise<Partial<Users>> {
    const user = await this.usersRepository.findOneBy({ id });
    this.usersRepository.remove(user);
    const { password, ...userNoPassword } = user;

    return userNoPassword;
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }
}

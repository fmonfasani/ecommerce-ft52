import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  adress: string;
  country?: string;
  city?: string;
}
@Injectable()
export class UserRepository {
  private users = [
    {
      id: 1,
      name: 'John',
      email: 'nVJQp@example.com',
      password: '123456',
      phone: '123456789',
      adress: '123 Main St',
      country: 'USA',
      city: 'New York',
    },
    {
      id: 2,
      name: 'Jane',
      email: 'nVJQp@example.com',
      password: '123456',
      phone: '123456789',
      adress: '123 Main St',
      country: 'USA',
      city: 'Miami',
    },
    {
      id: 3,
      name: 'Mark',
      email: 'nVJQp@example.com',
      password: '123456',
      phone: '123456789',
      adress: '123 Main St',
      country: 'USA',
      city: 'LA',
    },
  ];
  getUsers() {
    return this.users;
  }
}

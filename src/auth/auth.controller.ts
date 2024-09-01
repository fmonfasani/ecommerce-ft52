/* eslint-disable prettier/prettier */
import { Controller, Get, Put, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  getAuth(): string {
    return this.authService.getAuth();
  }
  @Post()
  signIn(@Body() credentials) {
    const { email, password } = credentials;
    return this.authService.signIn(email, password);
  }
}

/* eslint-disable prettier/prettier */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    // Llega el token por headers...
    const token = request.headers.authorization?.split(' ')[1]; // ['Bearer', 'xxxxx']

    if (!token) throw new UnauthorizedException('Token required');

    try {
      // Validar el token
      const secret = process.env.JWT_SECRET;
      const payload = this.jwtService.verify(token, { secret });

      console.log(payload);

      payload.exp = new Date(payload.exp * 1000);
      payload.iat = new Date(payload.iat * 1000);

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}

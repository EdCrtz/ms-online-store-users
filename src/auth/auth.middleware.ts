import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import axios from 'axios';
import { NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  extractToken(authorization: string): string | null {
    if (!authorization) {
      return null;
    }
    const parts = authorization.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      return parts[1];
    }
    return null;
  }
  async use(req: Request, res: Response, next: NextFunction) {
    const token = this.extractToken(req.headers.authorization);
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    // Envia una petición al servicio de autenticación para validar el token
    try {
      const user = await axios.post('http://localhost:4000/auth/validate', {
        token,
      });
      // Asigna la información del usuario a una variable para utilizarla en el controlador
      const userData = user.data.user;
      res.locals.user = userData;
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}

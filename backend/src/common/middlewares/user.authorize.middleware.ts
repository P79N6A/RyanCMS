import {
  Injectable,
  MiddlewareFunction,
  NestMiddleware,
  HttpStatus,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import dayjs from 'dayjs';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'user/entities/user.entity';

@Injectable()
export class UserAuthorizeMiddleware implements NestMiddleware {
  constructor(

  ) {}

  resolve(...args: any[]): MiddlewareFunction | Promise<MiddlewareFunction> {
    return async (req: any, res, next) => {
      const authorization = req.headers.authorization;
      if (authorization) {
        const token = authorization.replace('Ryan ', '');
        req.headers.auth = await UserEntity.verify(token);
      }
      next();
    };
  }
}

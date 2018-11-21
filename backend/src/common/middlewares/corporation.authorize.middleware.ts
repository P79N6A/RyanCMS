import {Injectable, MiddlewareFunction, NestMiddleware} from '@nestjs/common';
import {Repository} from 'typeorm';
import dayjs from 'dayjs';
import {CorporationAuthorizeEntity} from '../entities/corporation.authorize.entity';

@Injectable()
export class CorporationAuthorizeMiddleware implements NestMiddleware {
    constructor(private readonly corpAuthRepo: Repository<CorporationAuthorizeEntity>) {
    }

    resolve(...args: any[]): MiddlewareFunction | Promise<MiddlewareFunction> {
        return async (req: any, res, next) => {
            const token = req.headers.authorization.replace('Bearer ', '');
            if (!token) {
                next();
                return;
            }

            const auth = await this.corpAuthRepo.findOne({token}, {cache: 60});
            if (!auth) {
                next();
                return;
            }
            if (auth.expired_at < dayjs().unix()) {
                next();
                return;
            }

            req.corpAuth = auth;
            next();
        };
    }
}

import {Module, MiddlewareConsumer} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CommonModule} from 'common/common.module';
import {UserAuthorizeMiddleware} from 'common/middlewares/user.authorize.middleware';
import { UserModule } from 'user/user.module';

const file = './ormconfig.json';
const ormConfig = require(file);

@Module({
    imports: [
        TypeOrmModule.forRoot(ormConfig as any),
        CommonModule,
        UserModule
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserAuthorizeMiddleware).forRoutes('');
    }
}

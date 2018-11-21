import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ExceptionFilter} from './common/filters/exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new ExceptionFilter());
    await app.listen(8080);
}

bootstrap();

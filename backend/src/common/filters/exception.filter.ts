import {
    ArgumentsHost,
    Catch,
    ExceptionFilter as Filter,
    HttpException,
} from '@nestjs/common';

@Catch(HttpException, Error)
export class ExceptionFilter implements Filter {
    catch(exception: Error | HttpException, host: ArgumentsHost): any {
        const resp = host.switchToHttp().getResponse();
        const status =
            exception instanceof HttpException ? exception.getStatus() : 500;
        const errmsg =
            exception instanceof HttpException
                ? exception.message.message
                : exception.message;

        resp.status(status).json({errmsg, errcode: status});
    }
}

import {Injectable, NestInterceptor, ExecutionContext} from '@nestjs/common';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HashId} from 'util/hashids';

@Injectable()
export class HashIdInterceptor<T>
    implements NestInterceptor<T, any> {
    intercept(context: ExecutionContext,
              call$: Observable<T>): Observable<any> {
        return call$.pipe(map(data => HashId.transformToHash(data)));
    }
}
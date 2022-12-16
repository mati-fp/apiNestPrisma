import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { UnauhorizedError } from '../types/UnauthorizedError';

// Isso serve para ao inves de estourar aquele erro UnauthorizedError no terminal e 500 na requisão, ele mostra o que está dando
// de errado na requisição deixando mais bonito
@Injectable()
export class UnauhorizedInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (error instanceof UnauhorizedError) {
          throw new UnauthorizedException(error.message);
        } else {
          throw error;
        }
      }),
    );
  }
}

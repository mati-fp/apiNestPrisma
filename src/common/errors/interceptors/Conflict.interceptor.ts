import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ConflictException,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { ConflictError } from '../types/ConflictError';

// Isso serve para ao inves de estourar aquele erro UnauthorizedError no terminal e 500 na requisão, ele mostra o que está dando
// de errado na requisição deixando mais bonito
@Injectable()
export class ConflictInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (error instanceof ConflictError) {
          throw new ConflictException(error.message);
        } else {
          throw error;
        }
      }),
    );
  }
}

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let authService = inject(AuthService);

  const token = authService.getToken();

  const cloneReq = token 
  ? req.clone ({
      setHeaders: {
        Authorization: 'Bearer ' + token
      }
    })
  : req;

  return next(cloneReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        authService.logout();
      }

      return throwError(() => error)
    })
  )
};

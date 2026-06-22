import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let authService = inject(AuthService);
  const token = authService.getToken();

  if (!token) {
    return next(req);
  }

  const cloneReq = req.clone({
    setHeaders: {
      Authorization: 'Bearer ' + token
    }
  });
  
  return next(cloneReq);
};

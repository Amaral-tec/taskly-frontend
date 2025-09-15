import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from './auth';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);

  return next(req).pipe(
    catchError(err => {
      if (err.status === 401) {
        auth.logout();
        location.reload();
      }
      return throwError(() => err);
    })
  );
};

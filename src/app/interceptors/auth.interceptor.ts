import { HttpInterceptorFn } from '@angular/common/http';
import { UserService } from '../services/user/user.service';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {

  const userService = inject(UserService);
  const authService = inject(AuthService);

  const token = userService.getToken();

  if (token != null) {
    request = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  return next(request);
};

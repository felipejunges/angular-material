import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const service = inject(UserService);
  const isLoggedIn = service.isLoggedIn();

  if (isLoggedIn) {
    return true;
  } else {
    const router = inject(Router);
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
};

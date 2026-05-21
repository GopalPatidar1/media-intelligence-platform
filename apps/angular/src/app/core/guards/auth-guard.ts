import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const cookieService = inject(CookieService);

  try {
    const isLoggedIn = cookieService.check('authenticated');
    return isLoggedIn ? true : router.createUrlTree(['/login']);
  } catch (error) {
    return router.createUrlTree(['/login']);
  }
};

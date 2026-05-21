import { inject } from '@angular/core';
// import { CookieService } from 'ngx-cookie-service';
import { CanActivateFn, Router } from '@angular/router';

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);
//   const cookieService = inject(CookieService);

  try {
    const isLoggedIn = false
    // cookieService.check('authenticated');
    return isLoggedIn ? router.createUrlTree(['/dashboard']) : true;
  } catch (error) {
    console.error('Error in guestGuard:', error);
    return false; // Allow access to guest routes if there's an error checking authentication
  }
};

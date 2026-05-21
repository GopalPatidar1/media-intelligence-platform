import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);

  const isLoggedIn = document.cookie.includes('authenticated=true');
  console.log("🚀 ~ guestGuard ~ isLoggedIn:", isLoggedIn)

  return isLoggedIn
    ? router.createUrlTree(['/dashboard'])
    : true;
};
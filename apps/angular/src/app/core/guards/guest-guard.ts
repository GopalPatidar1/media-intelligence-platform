import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);

  const isLoggedIn = document.cookie.includes('authenticated=true');

  if (isLoggedIn) {
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};

import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  // check token from cookies
  const token = getCookie('authenticated');

  if (token) {
    return true;
  }

  return router.createUrlTree(['/login']);
};

// helper function
function getCookie(name: string): string | null {
  const cookies = document.cookie.split(';');

  for (let cookie of cookies) {
    const [key, value] = cookie.trim().split('=');

    if (key === name) {
      return value;
    }
  }

  return null;
}

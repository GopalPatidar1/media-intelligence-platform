import { HttpInterceptorFn } from '@angular/common/http';
const environment = { apiUrl: 'http://localhost:3000/api' };

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  // Add backend base URL automatically
  const apiReq = req.clone({
    url: `${environment.apiUrl}${req.url}`,
    setHeaders: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
  });

  return next(apiReq);
};

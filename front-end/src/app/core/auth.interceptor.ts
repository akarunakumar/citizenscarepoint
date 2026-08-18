import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

/**
 * Modern (Angular 15+) functional interceptor — the replacement for the
 * older class-based HttpInterceptor pattern. Registered in app.config.ts
 * via withInterceptors([authInterceptor]).
 *
 * This is what replaces the old auth.js authHeader() helper that had to
 * be manually spread into every fetch() call — now every HttpClient
 * request automatically gets the token attached here, in one place.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (!token) {
    return next(req);
  }

  const authedReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });

  return next(authedReq);
};

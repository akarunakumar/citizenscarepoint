import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './core/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // Angular 21 is zoneless by default — this project doesn't use
    // zone.js at all. provideZonelessChangeDetection() makes that
    // explicit (and keeps TestBed configured to match). This pairs
    // naturally with SidebarStateService's use of signal() — Angular
    // re-renders when a signal changes, no zone.js patching needed.
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      // Enables routerLink [fragment]="..." to actually scroll to the
      // target element — this is how service cards deep-link into the
      // GST Calculator / Salary Slip / Service Request sections on the
      // Services page, replacing the old ?service=X + native anchor hash.
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })
    ),
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};

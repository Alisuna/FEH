import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { fakeBackendInterceptor } from './service/fakeBackendInterceptor';
import { authKeyInterceptor } from './service/authKeyInterceptor';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([authKeyInterceptor, fakeBackendInterceptor])
    ),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withHashLocation())
  ]
};

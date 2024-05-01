import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MockHttpInterceptor } from '../services/mock-http-interceptors/mock.http-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    importProvidersFrom(HttpClientModule),
    { provide: HTTP_INTERCEPTORS, useClass: MockHttpInterceptor, multi: true }
  ],
};

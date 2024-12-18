// Rolul acestui interceptor este de a transmite in header-ul tuturor request-urilor http JWT Token-ul primit in momentul autentificarii.

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService) {} 
  // Injectam AuthService ca sa putem accesa token-ul

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    logRequestHeaders(request); // Display original headers

    // the set() method of the HttpHeaders class expects a non-null value for the header's value. However, this.authService.token can be null. To solve this we check if the token is not null before setting the authorization header
    const headers = this.authService.token
      ? request.headers.set('authorization', this.authService.token)
      : request.headers;
    // Here we create a headers variable that holds the modified headers. If this.authService.token is not null, we set the authorization header with the token value. Otherwise, we assign the original request headers to headers.
    //Then, when cloning the request, we pass the headers variable as the new headers for the cloned request.

    request = request.clone({ headers });
    // Creem un nou request pentru ca nu putem sa mutam requestul existent

    logRequestHeaders(request); // Display modified headers

    return next.handle(request);
  }
}

function logRequestHeaders(request: HttpRequest<any>) {
  console.log('Request Headers:');
  const headers = request.headers.keys();
  headers.forEach(header => {
    const headerValue = request.headers.get(header);
    console.log(`${header}: ${headerValue}`);
  });
}

// Aceasta o vom importa in app.module.ts la proprietatea providers
export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
  // By specifying multi: true, you allow multiple interceptors to be registered.
}
 
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

// funcion que se interpone entre la peticion y el servidor

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // logramos la autenticacion por medio de un interceptor con queryParams.
    request = request.clone({
      params: request.params
        ? request.params.set('key', environment.API_KEY)
        : new HttpParams().set('key', environment.API_KEY)
    });
    return next.handle(request);
  }
}


import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem('id_token');

    if (idToken) {
      /* let cloned = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${idToken}`,
          'Access-Control-Allow-Origin': '*'
        },
      }); */
      let cloned = req.clone();

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}

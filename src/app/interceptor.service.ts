import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(public auth: AuthService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.auth.getAccessTokenSilently().pipe(
      //map(idtoken => idtoken?.__raw),
      mergeMap(token => {
        if (token) {
          req = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
          });
        }
        return next.handle(req);
      }),
    );
  }
}
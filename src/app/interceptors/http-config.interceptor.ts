import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token: any = localStorage.getItem('JWT_TOKEN');
    console.log(token)

    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {

        }
        return event;
      }),
      catchError(err => {
        if (err.status === 401) {
          this.authService.logout();
          location.reload();
        }

        return throwError(err);
      }));

  }
}

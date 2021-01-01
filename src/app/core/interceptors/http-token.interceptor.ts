import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor() {}

  private headersConfig = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // TODO. token 추가
    return next.handle(request.clone({ setHeaders: this.headersConfig }));
  }
}

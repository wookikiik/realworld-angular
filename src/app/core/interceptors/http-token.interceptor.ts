import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service';

interface HeadersConfig {
  [key: string]: string;
}

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private jwtService: JwtService) {}

  private headersConfig = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  } as HeadersConfig;

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.jwtService.getToken();
    if (token && token !== 'undefined') {
      this.headersConfig.Authorization = `Token ${token}`;
    } else {
      delete this.headersConfig.Authorization;
    }

    return next.handle(request.clone({ setHeaders: this.headersConfig }));
  }
}

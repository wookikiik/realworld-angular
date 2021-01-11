import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private jwtToken: JwtService) {}

  private DEFAULT_HEADER_CONFIGS: { [key: string]: string } = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers = { ...this.DEFAULT_HEADER_CONFIGS };
    const token = this.jwtToken.getToken();
    if (token) {
      headers.Authorization = `Token ${token}`;
    }

    const request: HttpRequest<any> = req.clone({
      setHeaders: headers,
    });
    return next.handle(request);
  }
}

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Errors } from '../../models';
import { JwtService } from './jwt.service';

interface HeaderConfig {
  [name: string]: string | string[];
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private jwt: JwtService) {}

  private setHeaders(): HttpHeaders {
    let headerConfig: HeaderConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    if (this.jwt.getToken()) {
      headerConfig = {
        ...headerConfig,
        Authorization: `Token ${this.jwt.getToken()}`,
      };
    }
    return new HttpHeaders(headerConfig);
  }

  private formatErrors(error: HttpErrorResponse): Observable<never> {
    return throwError(error.error as Errors);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http
      .get(`${environment.api_url}${path}`, {
        headers: this.setHeaders(),
        params,
      })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body = {}): Observable<any> {
    return this.http
      .put(`${environment.api_url}${path}`, JSON.stringify(body), {
        headers: this.setHeaders(),
      })
      .pipe(catchError(this.formatErrors));
  }

  post(path: string, body = {}): Observable<any> {
    return this.http
      .post(`${environment.api_url}${path}`, JSON.stringify(body), {
        headers: this.setHeaders(),
      })
      .pipe(catchError(this.formatErrors));
  }

  delete(path: string): Observable<any> {
    return this.http
      .delete(`${environment.api_url}${path}`, { headers: this.setHeaders() })
      .pipe(catchError(this.formatErrors));
  }
}

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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

  public get(
    path: string,
    params: HttpParams = new HttpParams()
  ): Observable<any> {
    return this.http
      .get(`${environment.api_url}${path}`, {
        headers: this.setHeaders(),
        params,
      })
      .pipe(
        map((res: Response) => res.json()),
        catchError(this.formatErrors)
      );
  }

  public post(path: string, body = {}): Observable<any> {
    return this.http
      .post(`${environment.api_url}${path}`, JSON.stringify(body), {
        headers: this.setHeaders(),
      })
      .pipe(catchError(this.formatErrors));
  }
}

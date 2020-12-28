import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Errors } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private setHeaders(): HttpHeaders {
    const headerConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    return new HttpHeaders(headerConfig);
  }

  private formatErrors(error: HttpErrorResponse): Observable<never> {
    // console.log(error.error);
    // console.log(error.status);

    return throwError(error.error as Errors);
  }

  public post(path: string, body = {}): Observable<any> {
    return this.http
      .post(`${environment.api_url}${path}`, JSON.stringify(body), {
        headers: this.setHeaders(),
      })
      .pipe(
        map((res: Response) => res.json()),
        catchError(this.formatErrors)
      );
  }
}

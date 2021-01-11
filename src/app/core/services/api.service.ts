import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'environments';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Errors } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private formatErrors(error: any): Observable<Errors> {
    return throwError(error.error);
  }

  get(
    path: string,
    params:
      | HttpParams
      | { [param: string]: string | string[] } = new HttpParams()
  ): Observable<any> {
    return this.http
      .get(`${environments.api_url}${path}`, { params }) //
      .pipe(catchError(this.formatErrors));
  }

  post(path: string, payload: object = {}): Observable<any> {
    return this.http
      .post(`${environments.api_url}${path}`, payload) //
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, payload: object = {}): Observable<any> {
    return this.http
      .put(`${environments.api_url}${path}`, { payload }) //
      .pipe(catchError(this.formatErrors));
  }

  delete(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http
      .delete(`${environments.api_url}${path}`, { params }) //
      .pipe(catchError(this.formatErrors));
  }
}

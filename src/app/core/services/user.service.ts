import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private api: ApiService) {}

  login(user: User): Observable<User> {
    return this.api
      .post('/api/users/login', { user }) //
      .pipe(map((data: { user: User }) => data.user));
  }

  regist(user: User): Observable<User> {
    return this.api
      .post('/api/users', { user }) //
      .pipe(map((data: { user: User }) => data.user));
  }

  updateUser(user: User): Observable<User> {
    return this.api
      .put('/api/user', { user }) //
      .pipe(map((data: { user: User }) => data.user));
  }

  getUser(): Observable<User> {
    return this.api
      .get('/api/user') //
      .pipe(map((data: { user: User }) => data.user));
  }
}

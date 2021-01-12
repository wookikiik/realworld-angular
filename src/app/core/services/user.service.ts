import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import { User } from '../models';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private api: ApiService, private jwt: JwtService) {}

  private currentUserSubject = new ReplaySubject<User>(1);
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);

  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());
  public isAuthenticated = this.isAuthenticatedSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  populate(): void {
    if (this.jwt.getToken()) {
      this.getUser().subscribe(
        (user: User) => this.setAuth(user),
        (_) => this.purgeAuth()
      );
    } else {
      this.purgeAuth();
    }
  }

  login(user: User): Observable<User> {
    return this.api
      .post('/users/login', { user }) //
      .pipe(
        map((data: { user: User }) => data.user),
        tap((loginedUser) => {
          this.setAuth(loginedUser);
        })
      );
  }

  regist(user: User): Observable<User> {
    return this.api
      .post('/users', { user }) //
      .pipe(
        map((data: { user: User }) => data.user),
        tap((loginedUser) => {
          this.setAuth(loginedUser);
        })
      );
  }

  updateUser(user: User): Observable<User> {
    return this.api
      .put('/user', { user }) //
      .pipe(map((data: { user: User }) => data.user));
  }

  private getUser(): Observable<User> {
    return this.api
      .get('/user') //
      .pipe(map((data: { user: User }) => data.user));
  }

  setAuth(user: User): void {
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
    this.jwt.setToken(user.token);
  }

  purgeAuth(): void {
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.jwt.purgeToken();
  }
}

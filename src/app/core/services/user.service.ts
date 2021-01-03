import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { AuthType, User } from '../models';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  isAuthenticated = this.isAuthenticatedSubject.asObservable();
  currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  constructor(private apiService: ApiService, private jwtService: JwtService) {}

  populator(): void {
    if (this.jwtService.getToken()) {
      this.apiService.get('/user').subscribe(
        (data) => this.setAuth(data.user),
        (err) => this.purgeAuth()
      );
    } else {
      this.purgeAuth();
    }
  }

  attemptAuth(type: AuthType, user: User): Observable<User> {
    const suffixRoute = AuthType.LOGIN === type ? '/login' : '';
    return this.apiService
      .post(`/users${suffixRoute}`, { user }) //
      .pipe(
        //
        tap((data) => this.setAuth(data.user))
      );
  }

  setAuth(user: User): void {
    this.jwtService.setToken(user.token);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth(): void {
    this.jwtService.destroyToken();
    this.currentUserSubject.next({} as User);
    this.isAuthenticatedSubject.next(false);
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }
}

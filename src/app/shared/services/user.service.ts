import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { User } from 'src/app/models';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiService: ApiService, private jwt: JwtService) {}
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  populate(): void {
    if (this.jwt.getToken()) {
      this.apiService.get('/user').subscribe(
        (data) => this.setAuth(data.user),
        (err) => this.purgeAuth()
      );
    } else {
      this.purgeAuth();
    }
  }

  purgeAuth(): void {
    this.jwt.destoryToken();
    this.currentUserSubject.next({} as User);
    this.isAuthenticatedSubject.next(false);
  }

  private setAuth(user: User): void {
    this.jwt.saveToken(user.token);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  attemptAuth(type: string, credentials: object): Observable<User> {
    const route = type === 'login' ? '/login' : '';
    return this.apiService.post(`/users${route}`, { user: credentials }).pipe(
      tap((data) => this.setAuth(data.user)),
      tap(console.log)
    );
  }

  update(user: User): Observable<User> {
    return this.apiService.put('/user', { user }).pipe(
      tap((data) => {
        this.currentUserSubject.next(data.user);
      })
    );
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }
}

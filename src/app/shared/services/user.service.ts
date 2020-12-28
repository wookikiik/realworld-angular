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
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private apiService: ApiService, private jwt: JwtService) {}

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

  public attemptAuth(type: string, credentials: object): Observable<User> {
    const route = type === 'login' ? '/login' : '';
    return this.apiService.post(`/users${route}`, { user: credentials }).pipe(
      tap((data) => this.setAuth(data.user)),
      tap(console.log)
    );
  }

  public getCurrentUser(): User {
    return this.currentUserSubject.value;
  }
}

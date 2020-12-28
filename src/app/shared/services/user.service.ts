import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { User } from 'src/app/models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);

  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private apiService: ApiService) {
    this.isAuthenticatedSubject.next(false);
  }

  private setAuth(user: User): void {
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  public attemptAuth(type: string, credentials: object): Observable<User> {
    const route = type === 'login' ? '/login' : '';
    return this.apiService
      .post(`/users${route}`, { user: credentials })
      .pipe(tap((data) => this.setAuth(data.user)));
  }

  public getCurrentUser(): User {
    return this.currentUserSubject.value;
  }
}

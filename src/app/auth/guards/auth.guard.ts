import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user.service';

export enum AUTH_TYPE {
  CUSTOMER,
  ANONYMOUS,
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService, //
    private authType: AUTH_TYPE
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.userService.isAuthenticated.pipe(
      map((isAuthenticated) => {
        return this.authType === AUTH_TYPE.CUSTOMER
          ? isAuthenticated
          : !isAuthenticated;
      })
    );
  }
}

import { InjectionToken } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { AuthGuard as Guard, AUTH_TYPE } from './auth.guard';

export const NoAuthGuard = new InjectionToken<Guard>('NoAuthGuard');
export const AuthGuard = new InjectionToken<Guard>('AuthGuard');

export const AuthGuardFactory = (authType: AUTH_TYPE) => (
  userService: UserService
) => {
  return new Guard(userService, authType);
};

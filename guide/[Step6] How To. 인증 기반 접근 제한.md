# How To. 인증 기반 접근 제한

> 로그인에 대한 가드를 생성하고, 로그인하지 않은 사용자만 액세스할 수 있는 등록 페이지를 만들 수 있습니다.

# Create the NoAuthGuard service and implement it for the AuthModule routes

```tsx
ng generate guard /auth/noAuthGuard
? Which interfaces would you like to implement? CanActivate
```

`src/app/auth/no-auth-guard.service.ts`

```tsx
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserService } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuardGuard implements CanActivate {
  constructor(private userService: UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.userService.isAuthenticated.pipe(
      take(1),
      map((isAuthenticated) => !isAuthenticated)
    );
  }
}
```

`src/app/auth/auth.module.ts`

```tsx
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
import { AuthComponent } from './auth.component';
import { NoAuthGuardGuard } from './no-auth-guard.guard';

const authpageRouter: ModuleWithProviders<RouterModule> = RouterModule.forChild(
  [
    {
      path: 'login',
      component: AuthComponent,
      canActivate: [NoAuthGuardGuard],
    },
    {
      path: 'register',
      component: AuthComponent,
      canActivate: [NoAuthGuardGuard],
    },
  ]
);

@NgModule({
  declarations: [AuthComponent],
  providers: [NoAuthGuardGuard],
  imports: [CommonModule, authpageRouter, ReactiveFormsModule, SharedModule],
})
export class AuthModule {}
```

로그인 후 로그인, 등록 페이지를 엑세스 하려고 하면 접근을 허용 하지 않음

반대로 인증되지 않은 사용자가 편집, 설정 등 특정 페이지에 엑세스 할 수 없도록 인증 가드를 만든다.

## Create the AuthGuard service

```tsx
ng generate guard /shared/guard/authGuard
? Which interfaces would you like to implement? CanActivate
```

`src/app/shared/guard/auth-guard.service.ts`

```tsx
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserService } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  constructor(private userService: UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.userService.isAuthenticated.pipe(take(1));
  }
}
```

`src/app/shared/guard/index.ts`

```tsx
export * from './auth-guard.guard';
```

`src/app/shared/index.ts`

```tsx
+ export * from './guard';
```

# Declare it as a provider in the SharedModule

`src/app/shared/shared.module.ts`

```tsx
[...]

@NgModule({
  declarations: [ListErrorsComponent, ShowAuthedDirective],
  imports: [CommonModule, HttpClientModule],
  + providers: [ApiService, UserService, JwtService, **AuthGuardGuard**],
  exports: [ListErrorsComponent, ShowAuthedDirective],
})

[...]
```
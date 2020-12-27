# How To. 로그인, 회원가입 페이지

# 로그인, 회원가입 페이지 구성

## Auth Module 생성

```bash
ng generate module auth -m=app
```

## Auth Component 생성

```bash
ng generate component auth --selector=auth-page -m=auth
```

## Router 설정

### 로그인(/login), 회원가입(/register)

```tsx
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';

const authpageRouter: ModuleWithProviders<RouterModule> = RouterModule.forChild([
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'register',
    component: AuthComponent
  }
]);

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    authpageRouter
  ]
})
export class AuthModule { }
```

### Header에 링크 추가

src/app/shared/header/header.component.html

```html
<nav class="navbar navbar-light">
  <div class="container">
    <a class="navbar-brand" routerLink="/">conduit</a>
    <ul class="nav navbar-nav pull-xs-right">
      <li class="nav-item">
        <a class="nav-link" routerLink="/">
          Home
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" 
          routerLink="/login" 
          routerLinkActive="active">
          Sign in
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link"
          routerLink="/register" 
          routerLinkActive="active">
          Sign up
        </a>
      </li>
    </ul>
  </div>
</nav>
```

## 페이지 및 폼 구성 (with FormBuilder)

src/app/auth/auth.moduel

```tsx
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';

const authpageRouter: ModuleWithProviders<RouterModule> = RouterModule.forChild([
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'register',
    component: AuthComponent
  }
]);

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    authpageRouter,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
```

src/app/auth/auth.component.ts

```tsx
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'auth-page',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authType = '';
  title = '';
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private router: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.authForm = this.fb.group({
      email : ['', Validators.required],
      password : ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.router.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;

      // Set a title for the page accordingly
      this.title = (this.authType === 'login') ? 'Sign In' : 'Sign Up';

      // add form control for username if this is the register page
      this.authForm.addControl('username', new FormControl('', Validators.required));
    });
  }

  submitForm(): void {
    this.isSubmitting = true;

    const credentials = this.authForm.value;
    console.log(credentials);
  }

}
```

src/app/auth/auth.component.html

```html
<div class="auth-page">
  <div class="container page">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">{{ title }}</h1>
        <p class="text-xs-center">
          <a [routerLink]="['/login']" *ngIf="authType == 'register'">Have an account?</a>
          <a [routerLink]="['/register']" *ngIf="authType == 'login'">Need an account?</a>
        </p>
        <form [formGroup]="authForm" (ngSubmit)="submitForm()">
          <fieldset [disabled]="isSubmitting">
            <fieldset class="form-group">
              <input formControlName="username" placeholder="Username" class="form-control form-control-lg" type="text"
                *ngIf="authType == 'register'" />
            </fieldset>
            <fieldset class="form-group">
              <input formControlName="email" placeholder="Email" class="form-control form-control-lg" type="text" />
            </fieldset>
            <fieldset class="form-group">
              <input formControlName="password" placeholder="Password" class="form-control form-control-lg"
                type="password" />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" type="submit">
              {{ title }}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</div>
```
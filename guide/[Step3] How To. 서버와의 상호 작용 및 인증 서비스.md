# How To. 서버와의 상호 작용 및 인증 서비스

# API Spec

## Model

- User
  ```tsx
  interface User {
    email: string;
    token: string;
    username: string;
    bio: string;
    image: string;
  }
  ```

- Error
  ```tsx
  interface Error {
    errors: { [key: string]: string | Array<any> };
  }
  ```

## Endpoint

- 로그인
    - API : (POST) /api/users/login
    - 필수항목 : email, password
    - 인증 필요 없음, User 반환
- 회원가입
    - API : (POST) /api/users
    - 필수항목 : email, password, username
    - 인증 필요 없음, 가입된 User 반환
- 회원조회 (current user)
    - API : (GET) /api/user
    - 인증 필요, Current User 반환

# Models 생성

src/app/models/user.ts

```tsx
export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}
```

src/app/models/error.ts

```tsx
export interface Error{
  errors: {[key: string]: string};
}
```

src/app/models/index.ts

```tsx
export * from './error';
export * from './user';
```

# ApiService 생성

```bash
ng generate service /shared/services/api
```

src/app/shared/services/api.service.ts

```tsx
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Error } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private setHeaders(): HttpHeaders {
    const headerConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    return new HttpHeaders(headerConfig);
  }

  private formatErrors(error: HttpErrorResponse): Observable<never> {
    // console.log(error.error);
    // console.log(error.status);

    return throwError(error.error as Error);
  }

  public post(path: string, body = {}): Observable<any> {
    return this.http
      .post(`${environment.api_url}${path}`, JSON.stringify(body), {
        headers: this.setHeaders(),
      })
      .pipe(
        map((res: Response) => res.json()),
        catchError(this.formatErrors)
      );
  }
}
```

# UserService 생성

```bash
ng generate service /shared/services/user
```

src/app/shared/services/user.service.ts

```tsx
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  private setHeaders(): HttpHeaders{
    const headerConfig = {
      'Content-Type' : 'application/json',
      Accept : 'application/json'
    };

    return new HttpHeaders(headerConfig);
  }

  private formatErrors(error: any): Observable<never>{
    return throwError(error.json());
  }

  public post(path: string, body = {}): Observable<any>{
    return this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      { headers : this.setHeaders()}
    ).pipe(
      map((res: Response) => res.json()),
      catchError(this.formatErrors)
    );
  }
}
```

# Services index 및 providers 추가

src/app/shared/services/index.ts

```bash
export * from './api.service';
export * from './user.service';
```

src/app/shared/index.ts

```bash
export * from './layout';
export * from './services';
```

src/app/app.module.ts

```tsx
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import {
  ApiService,
  FooterComponent,
  HeaderComponent,
  UserService,
} from './shared';

const rounter = RouterModule.forRoot([], { useHash: true });

@NgModule({
  declarations: [AppComponent, FooterComponent, HeaderComponent],
  imports: [BrowserModule, rounter, HomeModule, AuthModule, HttpClientModule],
  providers: [ApiService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

# AuthComponen에 UserService 적용

src/app/auth/auth.component.ts

```tsx
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Error } from '../models';
import { UserService } from '../shared';

@Component({
  selector: 'auth-page',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  authType = '';
  title = '';
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe((data) => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;

      // Set a title for the page accordingly
      this.title = this.authType === 'login' ? 'Sign In' : 'Sign Up';

      // add form control for username if this is the register page
      this.authForm.addControl(
        'username',
        new FormControl('', Validators.required)
      );
    });
  }

  submitForm(): void {
    this.isSubmitting = true;

    const credentials = this.authForm.value;
    this.userService.attemptAuth(this.authType, credentials).subscribe(
      (_) => this.router.navigate(['/']),
      (err) => {
        console.log(err as Error);
        this.isSubmitting = false;
      }
    );
  }
}
```
# Error 메시지 처리

## ListErrors component 생성

```bash
ng generate component shared/listErrors --selector=list-errors
```

src/app/shared/list-errors/list-errors.html

```html
<ul class="error-messages" *ngIf="errorList">
    <li *ngFor="let error of errorList">
        {{ error }}
    </li>
</ul>
```

src/app/shared/list-errors/list-errors.ts

```tsx
import { Component, Input, OnInit } from '@angular/core';
import { Errors } from '../../models';

@Component({
  selector: 'list-errors',
  templateUrl: './list-errors.component.html',
  styleUrls: ['./list-errors.component.css'],
})
export class ListErrorsComponent implements OnInit {
  formattedErrors = [];

  @Input()
  set errors(errorList: Errors) {
    this.formattedErrors = [];
    if (errorList !== undefined) {
      for (const field of Object.keys(errorList.errors)) {
        this.formattedErrors.push(`${field} ${errorList.errors[field]}`);
      }
    }
  }

  get errorList(): Array<string> {
    return this.formattedErrors;
  }

  constructor() {}

  ngOnInit(): void {}
}
```

src/app/shared/index.ts

```tsx
export * from './layout';
export * from './list-errors/list-errors.component';
export * from './services';
```

## AuthComponent template에 반영

src/app/auth/auth.component.ts

```tsx
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Errors } from '../models';
import { UserService } from '../shared';

@Component({
  selector: 'auth-page',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  authType = '';
  title = '';
  isSubmitting = false;
  authForm: FormGroup;
  errors: Errors;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe((data) => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;

      // Set a title for the page accordingly
      this.title = this.authType === 'login' ? 'Sign In' : 'Sign Up';

      // add form control for username if this is the register page
      this.authForm.addControl(
        'username',
        new FormControl('', Validators.required)
      );
    });
  }

  submitForm(): void {
    this.isSubmitting = true;

    const credentials = this.authForm.value;
    this.userService.attemptAuth(this.authType, credentials).subscribe(
      (_) => this.router.navigate(['/']),
      (err) => {
        // console.log(err as Errors);
        this.errors = err as Errors;
        this.isSubmitting = false;
      }
    );
  }
}
```

src/app/auth/auth.component.html

```tsx
<div class="auth-page">
  <div class="container page">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">{{ title }}</h1>
        <p class="text-xs-center">
          <a [routerLink]="['/login']" *ngIf="authType == 'register'">Have an account?</a>
          <a [routerLink]="['/register']" *ngIf="authType == 'login'">Need an account?</a>
        </p>
        <list-errors [errors]="errors"></list-errors>
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
# How To. 회원정보 변경 페이지 구성

> 이제 사용자가 애플리케이션에 로그인할 수 있으므로 설정을 업데이트할 수 있습니다. 
우리가 구축할 사용자 서비스의 업데이트 방법에 연결된 양식이 있는 새 페이지를 만들어야 합니다. 
이 페이지 하단에 사용자 서비스의 제거를 호출해야 하는 로그아웃 버튼도 포함시킬 예정

# Create Settings module

```bash
ng generate module settings -m=app
```

# Create the SettingsComponent

```bash
ng generate component settings -m=settings --selector=settings-page --skip-import=true
```

`/src/app/settings/index.ts`

```bash
export * from './settings.component';
export * from './settings.module';
```

`src/app/settings/settings.component.html`

```html
<div class="settings-page">
  <div class="container page">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>
        <list-errors [errors]="errors"></list-errors>
        <form [formGroup]="settingsForm" (ngSubmit)="submitForm()">
          <fieldset [disabled]="isSubmitting">
            <fieldset class="form-group">
              <input class="form-control" type="text" placeholder="URL of profile picture" formControlName="image" />
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="text" placeholder="Username"
                formControlName="username" />
            </fieldset>
            <fieldset class="form-group">
              <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you"
                formControlName="bio">
                </textarea>
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="email" placeholder="Email" formControlName="email" />
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="password" placeholder="New Password"
                formControlName="password" />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" type="submit">
              Update Settings
            </button>
          </fieldset>
        </form>

        <!-- Line break for logout button -->
        <hr />

        <button class="btn btn-outline-danger" (click)="logout()">
          Or click here to logout.
        </button>
      </div>
    </div>
  </div>
</div>
```

`src/app/settings/settings.component.ts`

```tsx
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Errors, User } from 'src/app/models';
import { UserService } from 'src/app/shared';

@Component({
  selector: 'settings-page',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  user = {} as User;
  settingsForm: FormGroup;
  errors = {} as Errors;
  isSubmitting = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.settingsForm = this.fb.group({
      image: '',
      username: '',
      bio: '',
      email: '',
      password: '',
    } as User);
  }

  ngOnInit(): void {
    // Make a fresh copy of the current user's object to place in editable form fields
    Object.assign(this.user, this.userService.getCurrentUser());
    this.settingsForm.patchValue(this.user);
  }

  logout(): void {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

  submitForm(): void {
    this.isSubmitting = true;
    this.updateUser(this.settingsForm.value);
    this.userService.update(this.user).subscribe(
      (updatedUser) =>
        this.router.navigateByUrl('/profile/' + updatedUser.username),
      (err) => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  private updateUser(user: User): void {
    Object.assign(this.user, user);
  }
}
```

ngOnInit()에서는 현재 사용자의 정보를 복사한 다음 업데이트합니다. 양식을 제출하면 `UserService` 업데이트 기능이 호출됩니다.

# Build out the update function in User Service

`src/app/shared/services/user.service.ts`

```tsx
[...]

update(user: User): Observable<User> {
  return this.apiService.put('/user', { user }).pipe(
    tap((data) => {
      this.currentUserSubject.next(data.user);
    })
  );
}

[...]
```

# Add the following `put()` function to our ApiService

`src/app/shared/service/api.service.ts`

```tsx
[...]

put(path: string, body = {}): Observable<any> {
  return this.http
    .put(`${environment.api_url}${path}`, JSON.stringify(body), {
      headers: this.setHeaders(),
    })
    .pipe(catchError(this.formatErrors));
}

[...]
```

# Implement AuthGuard in settings module

`src/app/settings/settings.module.ts`

```tsx
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuardGuard, SharedModule } from '../shared';
import { SettingsComponent } from './settings.component';

const settingspageRouter: ModuleWithProviders<RouterModule> = RouterModule.forChild(
  [
    {
      path: 'settings',
      component: SettingsComponent,
      canActivate: [AuthGuardGuard],
    },
  ]
);

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    SharedModule,
    settingspageRouter,
    ReactiveFormsModule,
  ],
})
export class SettingsModule {}
```
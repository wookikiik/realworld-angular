# How To. 회원 프로필 페이지 구성

> 모든 사용자는 공개적으로 액세스할 수 있는 프로필 페이지가 있어야 합니다. 
프로필 페이지의 데이터는 이전에 만든 사용자 모델과 약간 다르므로 먼저 앱에서 예상할 수 있는 프로필 데이터의 모델을 만들어야 합니다.

# Profile Spec Information

## Model

- Profile

    ```json
    {
      "profile": {
        "username": "jake",
        "bio": "I work at statefarm",
        "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
        "following": false
      }
    }
    ```

## Endpoints

### **Get Profile**

`GET /api/profiles/:username`

Authentication optional, returns a Profile

# Create the Profile model

`src/app/shared/models/profile.model.ts`

```tsx
export interface Profile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}
```

`src/app/shared/models/index.ts`

```tsx
+ export * from './profile.model';
```

# Create the ProfileService

```bash
ng generate service /shared/services/profiles
```

`src/app/shared/service/profiles.service.ts`

```tsx
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Profile } from 'src/app/models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProfilesService {
  constructor(private apiService: ApiService) {}

  get(username: string): Observable<Profile> {
    return this.apiService
      .get('/profiles/' + username)
      .pipe(map((data: { profile: Profile }) => data.profile));
  }
}
```

`src/app/shared/service/index.ts`

```tsx
+ export * from './profiles.service';
```

# Create the ProfileModule

```bash
ng generate module profile -m=app
```

# Create the ProfileComponent

```bash
ng generate component profile --selector=profile-page -m=profile
```

`src/app/profile/index.ts`

```tsx
export * from './profile.component';
export * from './profile.module';
```

`src/app/profile/profile.component.html`

```html
<div class="profile-page">

  <div class="user-info">
    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <img [src]="profile.image" class="user-img" />
          <h4>{{ profile.username }}</h4>
          <p>{{ profile.bio }}</p>
          <a [routerLink]="['/settings']" [hidden]="!isUser" class="btn btn-sm btn-outline-secondary action-btn">
            <i class="ion-gear-a"></i> Edit Profile Settings
          </a>
        </div>

      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">

      <div class="col-xs-12 col-md-10 offset-md-1">
        <div class="articles-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <a class="nav-link">
                My Posts
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link">
                Favorited Posts
              </a>
            </li>
          </ul>
        </div>

      </div>

    </div>
  </div>

</div>
```

`src/app/profile/profile.component.ts`

```tsx
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile, User } from '../models';
import { UserService } from '../shared';

@Component({
  selector: 'profile-page',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  profile: Profile;
  currentUser: User;
  isUser: boolean;

  ngOnInit(): void {
    this.route.data.subscribe((data: { profile: Profile }) => {
      this.profile = data.profile;
    });

    this.userService.currentUser.subscribe((userData: User) => {
      this.currentUser = userData;
      this.isUser = this.currentUser.username === this.profile.username;
    });
  }

  onToggleFollowing(following: boolean): void {
    this.profile.following = following;
  }
}
```

사용자가 프로필 페이지에 액세스하기 전에 서버에서 프로필 데이터를 검색하고 오류를 처리하려고 합니다. 
그렇지 않으면 빈 페이지가 표시될 수 있습니다. 또한 **일종의 오류가 있는 경우 사용자가 오류를 표시하는 대신 루트 페이지('/')로 경로를 변경**하고자 합니다.

# Create the ProfileResolver

```bash
ng generate resolver profile
```

`src/app/profile/profile.resolver.ts`

```tsx
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProfilesService } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class ProfileResolver implements Resolve<boolean> {
  constructor(
    private profileService: ProfilesService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.profileService
      .get(route.params.username)
      .pipe(catchError((err) => this.router.navigateByUrl('/')));
  }
}
```

# Setting router  and declare ProfilesService in ProfileModule

`src/app/profile/profile.module.ts`

```tsx
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfilesService } from '../shared';
import { ProfileComponent } from './profile.component';
import { ProfileResolver } from './profile.resolver';

const profilepagRouting: ModuleWithProviders<RouterModule> = RouterModule.forChild(
  [
    {
      path: 'profile/:usernme',
      component: ProfileComponent,
      resolve: {
        profile: ProfileResolver,
      },
    },
  ]
);

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, profilepagRouting],
  providers: [ProfileResolver, ProfilesService],
})
export class ProfileModule {}
```

`src/app/app.module.ts`

```tsx
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { ProfileModule } from './profile';
import { SettingsModule } from './settings/settings.module';
import { FooterComponent, HeaderComponent, SharedModule } from './shared';

const rounter = RouterModule.forRoot([], { useHash: true });

@NgModule({
  declarations: [AppComponent, FooterComponent, HeaderComponent],
  imports: [
    BrowserModule,
    rounter,
    HomeModule,
    AuthModule,
    SharedModule,
    SettingsModule,
    ProfileModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```
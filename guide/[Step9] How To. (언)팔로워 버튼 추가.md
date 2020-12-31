# How To. (언)팔로워 버튼 추가

> 다른 사용자의 프로파일을 따르고 취소할 수 있습니다. 서버 API는 이를 위한 엔드포인트를 표시합니다. 따라서 프로파일 서비스에 팔로우 및 언팔로우 방법을 추가해야 합니다.

# Add `follow` and `unfollow` methods to the ProfileService

`src/app/shared/service/profile.service.ts`

```tsx
[...]

follow(username: string): Observable<Profile> {
    return this.apiService.post(`/profiles/${username}/follow`);
  }

unfollow(username: string): Observable<Profile> {
  return this.apiService.delete(`/profiles/${username}/follow`);
}

[...]
```

# Add `delete()` to our ApiService

`src/app/shared/services/api.servite.ts`

```tsx
[...]
delete(path: string): Observable<any> {
  return this.http
    .delete(`${environment.api_url}${path}`, { headers: this.setHeaders() })
    .pipe(
      catchError(this.formatErrors)
    );
}
[...]
```

# Create the FollowButtonComponent

```bash
ng generate component /shared/button/follow-button -m=shared --export=true --selector=follow-button
```

`src/app/sheared/buttons/index.ts`

```tsx
export * from './follow-button/follow-button.component';
```

`src/app/shared/buttons/follow-button/follow-button.component.html`

```html
<button
  class="btn btn-sm action-btn"
  [ngClass]="{
    disabled: isSubmitting,
    'btn-outline-secondary': !profile.following,
    'btn-secondary': profile.following
  }"
  (click)="toggleFollowing()"
>
  <i class="ion-plus-round"></i>
  &nbsp;
  {{ profile.following ? "Unfollow" : "Follow" }} {{ profile.username }}
</button>
```

`src/app/shared/buttons/follow-button/follow-button.component.ts`

```tsx
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/models';
import { ProfilesService, UserService } from '../../services';

@Component({
  selector: 'follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.css'],
})
export class FollowButtonComponent implements OnInit {
  constructor(
    private profileService: ProfilesService,
    private router: Router,
    private userService: UserService
  ) {}

  @Input() profile: Profile;
  @Output() toggle = new EventEmitter<boolean>();

  isSubmitting = false;

  ngOnInit(): void {}

  toggleFollowing(): void {
    this.isSubmitting = true;
    this.userService.isAuthenticated.subscribe((authenticated) => {
      if (!authenticated) {
        this.router.navigateByUrl('/');
        return;
      }

      if (!this.profile.following) {
        this.profileService.follow(this.profile.username).subscribe(
          (data) => {
            this.isSubmitting = false;
            this.toggle.emit(true);
          },
          (err) => (this.isSubmitting = false)
        );
      } else {
        this.profileService.unfollow(this.profile.username).subscribe(
          (data) => {
            this.isSubmitting = false;
            this.toggle.emit(false);
          },
          (err) => (this.isSubmitting = false)
        );
      }
    });
  }
}
```

# 팔로우 버튼 추가하기 in profile component

`src/app/profile/profile.component.html`

```html
[...]

           <img [src]="profile.image" class="user-img" />
           <h4>{{ profile.username }}</h4>
           <p>{{ profile.bio }}</p>
+          <follow-button
+            [hidden]="isUser"
+            [profile]="profile"
+            (toggle)="onToggleFollowing($event)">
+          </follow-button>
            <a [routerLink]="['/settings']"
               [hidden]="!isUser"
               class="btn btn-sm btn-outline-secondary action-btn">

[...]
```
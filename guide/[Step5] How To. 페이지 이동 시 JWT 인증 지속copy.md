# How To. 페이지 이동 시 JWT 인증 지속

# ShowAuthed directive 추가

```bash
ng generate directive /shared/directive/showAuthed -m=shared --export=true --selector=showAuthed
```

src/app/shared/directive/index.ts

```bash
export * from './show-authed.directive';
```

src/app/shared/directive/

```tsx
import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { UserService } from '../services';

@Directive({
  selector: '[showAuthed]',
})
export class ShowAuthedDirective implements OnInit {
  condition: boolean;

  constructor(
    private templateRef: TemplateRef<any>,
    private userService: UserService,
    private viewContainer: ViewContainerRef
  ) {}

  @Input()
  set showAuthed(condition: boolean) {
    this.condition = condition;
  }

  ngOnInit(): void {
    this.userService.isAuthenticated.subscribe((isAuthenticated) => {
      if (
        (isAuthenticated && this.condition) ||
        (!isAuthenticated && !this.condition)
      ) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }
}
```

src/app/shared/shared.module.ts

```tsx
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ShowAuthedDirective } from './directive';
import { FooterComponent, HeaderComponent } from './layout';
import { ListErrorsComponent } from './list-errors/list-errors.component';
import { ApiService, UserService } from './services';

@NgModule({
  declarations: [
    ListErrorsComponent,
    FooterComponent,
    HeaderComponent,
    ShowAuthedDirective,
  ],
  imports: [CommonModule, HttpClientModule],
  providers: [ApiService, UserService],
  exports: [
    ListErrorsComponent,
    FooterComponent,
    HeaderComponent,
    ShowAuthedDirective,
  ],
})
export class SharedModule {}
```

# ShowAuthed directive 적용

## Home component

src/app/home/home.module.ts

```tsx
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
import { HomeComponent } from './home.component';

const homepageRouter: ModuleWithProviders<RouterModule> = RouterModule.forChild(
  [
    {
      path: '',
      component: HomeComponent,
    },
  ]
);

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, homepageRouter, SharedModule],
})
export class HomeModule {}
```

src/app/home/home.component.html

```html
<div class="home-page">
  <div class="banner" *showAuthed="false">
    <div class="container">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your <i>Angular</i> knowledge.</p>
    </div>
  </div>
  <div class="container page">
    <div class="row">
      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <a class="nav-link"> Your Feed </a>
            </li>
            <li class="nav-item">
              <a class="nav-link"> Global Feed </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

## Header component

src/app/shared/layout/header/header.component.html

```html
<nav class="navbar navbar-light">
  <div class="container">
    <a class="navbar-brand" routerLink="/">conduit</a>
    <ul *showAuthed="false" class="nav navbar-nav pull-xs-right">
      <li class="nav-item">
        <a class="nav-link" 
          routerLink="/" 
          routerLinkActive="active">
        >
          Home
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" 
          routerLink="/login" 
          routerLinkActive="active"
        >
          Sign in
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" 
          routerLink="/register" 
          routerLinkActive="active"
        >
          Sign up
        </a>
      </li>
    </ul>
    <!-- Show this for logged in users -->
    <ul *showAuthed="true" class="nav navbar-nav pull-xs-right">
      <li class="nav-item">
        <a class="nav-link" 
          routerLink="/" 
          routerLinkActive="active"
        >
          Home
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link">
          <i class="ion-compose"></i>&nbsp;New Article
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link">
          <i class="ion-gear-a"></i>&nbsp;Settings
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link">
          My Profile
        </a>
      </li>
    </ul>
  </div>
</nav>
```

## UserService에 초기값 설정

src/app/shared/services/user.service.ts

```tsx
constructor(private apiService: ApiService) {
    + this.isAuthenticatedSubject.next(false);
}
```
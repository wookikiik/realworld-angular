# How To. 페이지 레이어아웃 및 라우팅

# 프로젝트 설정

## Github 에서 프로젝트 클론

```bash
git clone https://github.com/wookikiik/realworld-angular/tree/master realworld
cd realworld
```

- 레파지토리 복제 후 `yarn` 실행 하여 필요한 종속성을 설치
- 브랜치 변경 ( witch is named `s-`1)

```bash
git checkout s-1
```

---

# Header, Footer 레이어아웃

## FooterComponent 생성

```bash
ng generate component /shared/layout/footer --selector=layout-footer -m=app
```

```html
<footer>
  <div class="container">
    <a class="logo-font" routerLink="/">conduit</a>
    <span class="attribution">
      &copy; {{ **today | date: 'yyyy'** }}.
      An interactive learning project from <a href="https://thinkster.io">Thinkster</a>.
      Code licensed under MIT.
    </span>
  </div>
</footer>
```

```tsx
import { Component } from '@angular/core';

@Component({
  selector: 'layout-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  today: number = Date.now();
} 
```

## HeaderComponent 생성

```bash
ng generate component /shared/layout/header --selector=layout-header -m=app
```

```html
<nav class="navbar navbar-light">
  <div class="container">
    <a class="navbar-brand" routerLink="/">conduit</a>
    <ul class="nav navbar-nav pull-xs-right">
      <li class="nav-item">
        <a class="nav-link"
          routerLink="/">
          Home
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link">
          Sign in
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link">
          Sign up
        </a>
      </li>
    </ul>
  </div>
</nav>
```

## index.ts 및 Moduel import 추가

### index.ts 설정

- layout (src/app/shared/layout)

    ```tsx
    export * from './footer/footer.component';
    export * from './header/header.component';
    ```

- shared (src/app/shared)

    ```tsx
    export * from './layout';
    ```

- Moduel import (src/app/app.moduel)

    ```tsx
    import { NgModule } from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';
    import { AppComponent } from './app.component';
    import { FooterComponent, HeaderComponent } from './shared';

    @NgModule({
      declarations: [
        AppComponent,
        FooterComponent,
        HeaderComponent
      ],
      imports: [
        BrowserModule
      ],
      providers: [],
      bootstrap: [AppComponent]
    })
    export class AppModule { }
    ```

### 레이어아웃 적용 (src/app/app.component)

```html
<layout-header></layout-header>
<layout-footer></layout-footer>
```

---

# Home page ( with Router )

### HomeModuel 생성

```bash
ng generate module home -m=app
```

### HomeComponent 생성

```bash
ng generate component home --selector=home-page -m=home
```

```css
.nav-link {
  cursor:pointer;
}
```

```html
<div class="home-page">
  <div class="banner">
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

### Router 설정 ( src/app/home/home.moduel )

```tsx
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

const homepageRouter: ModuleWithProviders<RouterModule> = RouterModule.forChild([
  {
    path: '',
    component: HomeComponent
  }
]);

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    homepageRouter
  ]
})
export class HomeModule { }
```

### App module 에 RouterModuel 생성 ( src/app/app.moduel )

```tsx
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FooterComponent, HeaderComponent } from './shared';
import { HomeModule } from './home/home.module';

const rounter = RouterModule.forRoot([], {useHash: true});

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    rounter,
    HomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

```html
<layout-header></layout-header>
<router-outlet></router-outlet>
<layout-footer></layout-footer>
```

# How To: 아티클 페이지 ( 즐겨찾기,팔로우 )

> 문서 페이지를 만들어 다른 모든 사용자가 볼 수 있도록 표시하겠습니다. 
아티클 페이지에는 해당 아티클을 삭제할 수 있고 해당 아티클을 선호/비호환할 수 있는 기능이 필요합니다.

# Add `destroy`, `favorite`, and `unfavorite` methods to the ArticlesService

`src/app/shared/services/articles.service.ts`

```tsx
[...]

destory(slug: string): Observable<Article> {
  return this.apiService.delete(`/articles/${slug}`);
}

favorite(slug: string): Observable<Article> {
  return this.apiService.post(`/articles/${slug}/favorite`);
}

unfavorite(slug: string): Observable<Article> {
  return this.apiService.delete(`/articles/${slug}/favorite`);
}

[...]
```

# Create the ArticleModule

```bash
ng generate module article -m=app
```

# Create the ArticleComponent

```bash
ng generate component article -m=article --selector=article-page
```

`src/app/article/article.component.html`

```html
<div class="article-page">
  <div class="banner">
    <div class="container">
      <h1>{{ article.title }}</h1>
    </div>
  </div>

  <div class="container page">
    <div class="row article-content">
      <div class="col-md-12">
        <div [innerHTML]="article.body | markdown"></div>

        <ul class="tag-list">
          <li
            *ngFor="let tag of article.tagList"
            class="tag-default tag-pill tag-outline"
          >
            {{ tag }}
          </li>
        </ul>
      </div>
    </div>

    <hr />

    <div class="article-actions"></div>

    <div class="row">
      <div class="col-xs-12 col-md-8 offset-md-2">
        <div *showAuthed="false">
          <a [routerLink]="['/login']">Sign in</a> or
          <a [routerLink]="['/register']">sign up</a> to add comments on this
          article.
        </div>
      </div>
    </div>
  </div>
</div>
```

`src/app/article/article.component.ts`

```tsx
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article, User } from '../models';
import { ArticlesService, UserService } from '../shared';

@Component({
  selector: 'article-page',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  article: Article;
  currentUser: User;
  canModify: boolean;
  isSubmitting = false;
  isDeleting = false;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticlesService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: { article: Article }) => {
      this.article = data.article;
    });

    this.userService.currentUser.subscribe((user: User) => {
      this.currentUser = user;
      this.canModify =
        this.currentUser.username === this.article.author.username;
    });
  }

  onToogleFollowing(following: boolean): void {
    this.article.author.following = following;
  }

	onToggleFavorite(favorite: boolean): void {
    this.article.favorited = favorite;
  }

  deleteArticle(): void {
    this.isDeleting = true;
    this.articleService.destory(this.article.slug).subscribe((success) => {
      this.router.navigateByUrl('/');
    });
  }
}
```

마크다운 표기를 위해 pipe가 필요하다. (마크다운 package 추가)

`yarn add marked`

# Create the MarkdownPipe

```bash
ng generate pipe article/markdown -m=article
```

`src/app/article/markdown.pipe.ts`

```tsx
import { Pipe, PipeTransform } from '@angular/core';
import * as marked from 'marked';

@Pipe({
  name: 'markdown',
})
export class MarkdownPipe implements PipeTransform {
  transform(content: string): string {
    return marked(content, { sanitize: true });
  }
}
```

We'll also need to automatically resolve the article's data before the component initializes.

# Create the ArticleResolver

```bash
ng generate resolver article/article
```

`src/app/article/article.resolver.ts`

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
import { ArticlesService } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class ArticleResolver implements Resolve<any> {
  constructor(
    private router: Router,
    private articleService: ArticlesService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.articleService
      .get(route.params.slug)
      .pipe(catchError((err) => this.router.navigateByUrl('/')));
  }
}
```

# Update the ArticleModuel

`src/app/articel/article.moduel.ts`

```tsx
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArticleComponent } from './article.component';
import { ArticleResolver } from './article.resolver';
import { MarkdownPipe } from './markdown.pipe';

const articlepageRouting: ModuleWithProviders<RouterModule> = RouterModule.forChild(
  [
    {
      path: 'article/:slug',
      component: ArticleComponent,
      resolve: {
        article: ArticleResolver,
      },
    },
  ]
);
@NgModule({
  declarations: [ArticleComponent, MarkdownPipe],
  imports: [CommonModule, articlepageRouting],
  providers: [ArticleResolver],
})
export class ArticleModule {}
```

아티클의 작성자 및 즐겨찾기, 팔로우 버튼이 필요 하다. 해당 요소들을 표시할 수 있는 컴포넌트를 생성한다.

# Create the ArticleMeta component

```bash
ng generate component shared/article-helpers/articelMeta -m=shared --selector=article-meta --flat=true --export=true
```

`src/app/shared/article-helpers/article-meta.component.html`

```html
<div class="article-meta">
  <a [routerLink]="['/profile', article.author.username]">
    <img [src]="article.author.image" />
  </a>

  <div class="info">
    <a class="author"
      [routerLink]="['/profile', article.author.username]">
      {{ article.author.username }}
    </a>
    <span class="date">
      {{ article.createdAt | date: 'longDate' }}
    </span>
  </div>

  <ng-content></ng-content>
</div>
```

`src/app/shared/article-helpers/article-meta.component.ts`

```tsx
import { Component, Input } from '@angular/core';
import { Article } from 'src/app/models';

@Component({
  selector: 'article-meta',
  templateUrl: './articel-meta.component.html',
  styleUrls: ['./articel-meta.component.css'],
})
export class ArticelMetaComponent {
  @Input() article: Article;
}
```

`src/app/shared/article-helpers/index.ts`

```tsx
export * from './articel-meta.component';
```

`src/app/shared/index.ts`

```tsx
export * from './articel-helpers';
```

# Create the FavoriteButton

```tsx
ng generate component shared/buttons/favorite-button -m=shared --export=true
```

`src/app/shared/buttons/favorite-button/favority-button.component.html`

```html
<button
  class="btn btn-sm"
  [ngClass]="{
    disabled: isSubmitting,
    'btn-outline-primary': !article.favorited,
    'btn-primary': article.favorited
  }"
  (click)="toggleFavorite()"
>
  <i class="ion-heart"></i> <ng-content></ng-content>
</button>
```

`src/app/shared/buttons/favorite-button/favority-button.component.ts`

```tsx
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models';
import { ArticlesService, UserService } from '../../services';

@Component({
  selector: 'favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.css'],
})
export class FavoriteButtonComponent implements OnInit {
  constructor(
    private articleService: ArticlesService,
    private router: Router,
    private userService: UserService
  ) {}

  @Input() article: Article;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  ngOnInit(): void {}

  toggleFavorite(): void {
    this.isSubmitting = true;
    this.userService.isAuthenticated.subscribe((isAuthenticated) => {
      if (!isAuthenticated) {
        this.router.navigateByUrl('/login');
        return;
      }

      if (!this.article.favorited) {
        this.articleService.favorite(this.article.slug).subscribe(
          (data) => {
            this.isSubmitting = false;
            this.toggle.emit(true);
          },
          (err) => (this.isSubmitting = false)
        );
      } else {
        this.articleService.unfavorite(this.article.slug).subscribe(
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

# Add the `FavoriteButtonComponent` and `ArticleMetaComponent` to the `ArticleComponent`

`src/app/article/article.module.ts`

```tsx
[...]

@NgModule({
  declarations: [ArticleComponent, MarkdownPipe],
	  imports: [
			CommonModule, 
			articlepageRouting, 
			+ SharedModule
		],
  providers: [ArticleResolver],
})

[...]
```

`src/app/article/article.component.html`

```html
<div class="article-page">
  <div class="banner">
    <div class="container">
      <h1>{{ article.title }}</h1>

      <article-meta [article]="article">
        <span [hidden]="!canModify">
          <a
            class="btn btn-sm btn-outline-secondary"
            [routerLink]="['/editor', article.slug]"
          >
            <i class="ion-edit"></i> Edit Article +
          </a>

          <button
            class="btn btn-sm btn-outline-danger"
            [ngClass]="{ disabled: isDeleting }"
            (click)="deleteArticle()"
          >
            <i class="ion-trash-a"></i> Delete Article
          </button>
        </span>

        <span [hidden]="canModify">
          <follow-button
            [profile]="article.author"
            (onToggle)="onToggleFollowing($event)"
          >
          </follow-button>

          <favorite-button
            [article]="article"
            (onToggle)="onToggleFavorite($event)"
          >
            {{ article.favorited ? "Unfavorite" : "Favorite" }} Article
            <span class="counter">({{ article.favoritesCount }})</span>
          </favorite-button>
        </span>
      </article-meta>
    </div>
  </div>

  <div class="container page">
    <div class="row article-content">
      <div class="col-md-12">
        <div [innerHTML]="article.body | markdown"></div>

        <ul class="tag-list">
          <li
            *ngFor="let tag of article.tagList"
            class="tag-default tag-pill tag-outline"
          >
            {{ tag }}
          </li>
        </ul>
      </div>
    </div>

    <hr />

    <div class="article-actions">
      <article-meta [article]="article">
        <span [hidden]="!canModify">
          <a
            class="btn btn-sm btn-outline-secondary"
            [routerLink]="['/editor', article.slug]"
          >
            <i class="ion-edit"></i> Edit Article
          </a>

          <button
            class="btn btn-sm btn-outline-danger"
            [ngClass]="{ disabled: isDeleting }"
            (click)="deleteArticle()"
          >
            <i class="ion-trash-a"></i> Delete Article
          </button>
        </span>

        <span [hidden]="canModify">
          <follow-button
            [profile]="article.author"
            (onToggle)="onToggleFollowing($event)"
          >
          </follow-button>

          <favorite-button
            [article]="article"
            (onToggle)="onToggleFavorite($event)"
          >
            {{ article.favorited ? "Unfavorite" : "Favorite" }} Article
            <span class="counter">({{ article.favoritesCount }})</span>
          </favorite-button>
        </span>
      </article-meta>
    </div>

    <div class="row">
      <div class="col-xs-12 col-md-8 offset-md-2">
        <div *showAuthed="false">
          <a [routerLink]="['/login']">Sign in</a> or
          <a [routerLink]="['/register']">sign up</a> to add comments on this
          article.
        </div>
      </div>
    </div>
  </div>
</div>
```
# How To. Articles 생성, 수정 페이지 구성

> 사용자는 자신의 문서를 만들고 편집할 수 있어야 합니다. 여기서는 이 기능을 구축하려고 합니다.

# API Spec

## Model

- Single Article

    ```json
    {
      "article": {
        "slug": "how-to-train-your-dragon",
        "title": "How to train your dragon",
        "description": "Ever wonder how?",
        "body": "It takes a Jacobian",
        "tagList": ["dragons", "training"],
        "createdAt": "2016-02-18T03:22:56.637Z",
        "updatedAt": "2016-02-18T03:48:35.824Z",
        "favorited": false,
        "favoritesCount": 0,
        "author": {
          "username": "jake",
          "bio": "I work at statefarm",
          "image": "https://i.stack.imgur.com/xHWG8.jpg",
          "following": false
        }
      }
    }
    ```

- Multiple Articles

    ```json
    {
      "articles":[{
        "slug": "how-to-train-your-dragon",
        "title": "How to train your dragon",
        "description": "Ever wonder how?",
        "body": "It takes a Jacobian",
        "tagList": ["dragons", "training"],
        "createdAt": "2016-02-18T03:22:56.637Z",
        "updatedAt": "2016-02-18T03:48:35.824Z",
        "favorited": false,
        "favoritesCount": 0,
        "author": {
          "username": "jake",
          "bio": "I work at statefarm",
          "image": "https://i.stack.imgur.com/xHWG8.jpg",
          "following": false
        }
      }, {
        "slug": "how-to-train-your-dragon-2",
        "title": "How to train your dragon 2",
        "description": "So toothless",
        "body": "It a dragon",
        "tagList": ["dragons", "training"],
        "createdAt": "2016-02-18T03:22:56.637Z",
        "updatedAt": "2016-02-18T03:48:35.824Z",
        "favorited": false,
        "favoritesCount": 0,
        "author": {
          "username": "jake",
          "bio": "I work at statefarm",
          "image": "https://i.stack.imgur.com/xHWG8.jpg",
          "following": false
        }
      }],
      "articlesCount": 2
    }
    ```

## Endpoint

- **List Articles**
- **Feed Articles**
- **Get Article**
- **Create Article**
- **Update Article**
- **Delete Article**

# Models 생성

문서 편집기를 만들기 전에 먼저 기사 자체에 대한 모델을 만들어야 합니다.

`src/app/models/article.ts`

```tsx
import { Profile } from './profile';

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: Array<string>;
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}
```

`src/app/models/index`

```tsx
+ export * from './article';
```

# Create the ArticlesService

```tsx
ng generate service shared/services/articles -m=shared
```

`/src/app/shared/services/articles.service.ts`

```tsx
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article } from 'src/app/models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private apiService: ApiService) {}

  get(slug: string): Observable<Article> {
    return this.apiService
      .get(`/articles/${slug}`)
      .pipe(map((data) => data.article));
  }

  save(article: Article): Observable<Article> {
    if (article.slug) {
      return this.apiService.put(`/articles/${article.slug}`, { article });
    } else {
      return this.apiService
        .post(`/articles`, { article })
        .pipe(map((data: { article: Article }) => data.article));
    }
  }
}
```

`src/app/shared/services/index.ts`

```tsx
+ export * from './articles.service';
```

# Create the EditableArticleResolver

```tsx
ng generate resolver editor/editableArticle
```

`src/app/editor/editable-article.resolver.ts`

```tsx
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Article } from '../models';
import { ArticlesService, UserService } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class EditableResolver implements Resolve<boolean> {
  constructor(
    private articleService: ArticlesService,
    private router: Router,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.articleService.get(route.params.slug).pipe(
      map((article: Article) => {
        if (
          this.userService.getCurrentUser().username === article.author.username
        ) {
          return article;
        } else {
          this.router.navigateByUrl('/');
        }
      }),
      catchError((_) => this.router.navigateByUrl('/'))
    );
  }
}
```

# Create the EditorModule

```bash
ng generate module editor -m=app
```

# Create the EditorComponent

```bash
ng generate component editor -m=editor --selector=editor-page
```

`src/app/editor/editor.component.html`

```html
<div class="editor-page">
  <div class="container page">
    <div class="row">
      <div class="col-md-10 offset-md-1 col-xs-12">
        <list-errors [errors]="errors"></list-errors>

        <form [formGroup]="articleForm">
          <fieldset [disabled]="isSubmitting">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                formControlName="title"
                type="text"
                placeholder="Article Title"
              />
            </fieldset>

            <fieldset class="form-group">
              <input
                class="form-control"
                formControlName="description"
                type="text"
                placeholder="What's this article about?"
              />
            </fieldset>

            <fieldset class="form-group">
              <textarea
                class="form-control"
                formControlName="body"
                rows="8"
                placeholder="Write your article (in markdown)"
              >
              </textarea>
            </fieldset>

            <fieldset class="form-group">
              <input
                class="form-control"
                type="text"
                placeholder="Enter tags"
                [formControl]="tagField"
                (keyup.enter)="addTag()"
              />

              <div class="tag-list">
                <span
                  *ngFor="let tag of article.tagList"
                  class="tag-default tag-pill"
                >
                  <i class="ion-close-round" (click)="removeTag(tag)"></i>
                  {{ tag }}
                </span>
              </div>
            </fieldset>

            <button
              class="btn btn-lg pull-xs-right btn-primary"
              type="button"
              (click)="submitForm()"
            >
              Publish Article
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</div>
```

`src/app/editor/editor.component.ts`

```tsx
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article, Errors } from '../models';
import { ArticlesService } from '../shared';

@Component({
  selector: 'editor-page',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  article = {} as Article;
  articleForm: FormGroup;
  tagField = new FormControl();
  errors = {} as Errors;
  isSubmitting = false;

  constructor(
    private articlesService: ArticlesService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.articleForm = this.fb.group({
      title: '',
      description: '',
      body: '',
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: { article: Article }) => {
      if (data.article) {
        this.article = data.article;
        this.articleForm.patchValue(this.article);
      }
    });
  }

  addTag(): void {
    const tag = this.tagField.value;
    if (this.article.tagList.indexOf(tag) < 0) {
      this.article.tagList.push(tag);
    }
    this.tagField.reset('');
  }

  removeTag(tagName: string): void {
    this.article.tagList = this.article.tagList.filter(
      (tag) => tag !== tagName
    );
  }

  updateArticle(article: Article): void {
    Object.assign(this.article, article);
  }

  submitForm(): void {
    this.isSubmitting = true;
    this.updateArticle(this.articleForm.value);
    this.articlesService.save(this.article).subscribe(
      (article) => this.router.navigateByUrl(`editor/${article.slug}`),
      (err) => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }
}
```

# Update the Editor Moduel

`src/app/editor/editor.module.ts`

```tsx
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuardGuard, SharedModule } from '../shared';
import { EditableResolver } from './editable-article.resolver';
import { EditorComponent } from './editor.component';

const editorRouting: ModuleWithProviders<RouterModule> = RouterModule.forChild([
  {
    path: 'editor',
    component: EditorComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'editor/:slug',
    component: EditorComponent,
    canActivate: [AuthGuardGuard],
    resolve: {
      article: EditableResolver,
    },
  },
]);

@NgModule({
  declarations: [EditorComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, editorRouting],
  providers: [EditableResolver],
})
export class EditorModule {}
```
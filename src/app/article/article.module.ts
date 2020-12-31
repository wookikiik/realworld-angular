import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
import { ArticleCommentComponent } from './article-comment/article-comment.component';
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
  declarations: [ArticleComponent, MarkdownPipe, ArticleCommentComponent],
  imports: [
    CommonModule,
    articlepageRouting,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ArticleResolver],
})
export class ArticleModule {}

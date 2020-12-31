import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
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
  imports: [CommonModule, articlepageRouting, SharedModule],
  providers: [ArticleResolver],
})
export class ArticleModule {}

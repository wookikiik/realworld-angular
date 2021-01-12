import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleResolver } from '../core/resolver/article.resolver';
import { ArticleComponent } from './article.component';

const routes: Routes = [
  {
    path: ':slug',
    component: ArticleComponent,
    resolve: {
      article: ArticleResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleRoutingModule {}

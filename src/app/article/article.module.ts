import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ArticleCommentComponent } from './article-comment/article-comment.component';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article.component';

@NgModule({
  declarations: [ArticleComponent, ArticleCommentComponent],
  imports: [
    CommonModule, //
    ArticleRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class ArticleModule {}

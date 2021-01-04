import { Component, Input } from '@angular/core';
import { Article } from 'src/app/core/models';

@Component({
  selector: 'article-meta',
  templateUrl: './article-meta.component.html',
})
export class ArticleMetaComponent {
  @Input() article: Article;
}

import { Component, Input } from '@angular/core';
import { Article } from 'src/app/core/models';

@Component({
  selector: 'article-preview',
  templateUrl: './article-preview.component.html',
})
export class ArticlePreviewComponent {
  @Input() article: Article;

  onTriggerFavorite(favorited: boolean): void {
    this.article.favorited = favorited;
    favorited //
      ? this.article.favoritesCount++
      : this.article.favoritesCount--;
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/core/models';

@Component({
  selector: 'article-preview',
  templateUrl: './article-preview.component.html',
})
export class ArticlePreviewComponent implements OnInit {
  @Input() article: Article;

  constructor() {}

  ngOnInit(): void {}

  onToggleFavorite(favorite: boolean): void {
    this.article.favorited = favorite;
  }
}

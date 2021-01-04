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

  onToggleFavorite(favorited: boolean): void {
    this.article.favorited = favorited;
    favorited ? this.article.favoritesCount++ : this.article.favoritesCount--;
  }
}

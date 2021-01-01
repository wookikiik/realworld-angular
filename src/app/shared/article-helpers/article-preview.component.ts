import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/models';

@Component({
  selector: 'article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.css'],
})
export class ArticlePreviewComponent implements OnInit {
  @Input() article: Article;

  onToggleFavorite(favorited: boolean): void {
    this.article.favorited = favorited;
    favorited ? this.article.favoritesCount++ : this.article.favoritesCount--;
  }
  constructor() {}

  ngOnInit(): void {}
}

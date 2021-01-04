import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/core/models';

@Component({
  selector: 'article-meta',
  templateUrl: './article-meta.component.html',
})
export class ArticleMetaComponent implements OnInit {
  @Input() article: Article;

  constructor() {}

  ngOnInit(): void {}
}

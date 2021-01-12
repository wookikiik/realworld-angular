import { Component, Input, OnInit } from '@angular/core';
import { Article, Profile } from 'src/app/core/models';

@Component({
  selector: 'article-meta',
  templateUrl: './article-meta.component.html',
})
export class ArticleMetaComponent implements OnInit {
  @Input() article: Article;

  profile: Profile;

  ngOnInit(): void {
    this.profile = this.article.author;
  }
}

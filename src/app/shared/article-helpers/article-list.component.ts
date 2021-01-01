import { Component, Input, OnInit } from '@angular/core';
import { Article, ArticleListConfig } from 'src/app/models';
import { ArticlesService } from '../services';

@Component({
  selector: 'article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
})
export class ArticleListComponent implements OnInit {
  constructor(private articlesService: ArticlesService) {}

  query: ArticleListConfig;
  results: Article[];
  loading = false;
  currentPage = 1;
  totalPages = [1];

  @Input() limit: number;
  @Input()
  set config(config: ArticleListConfig) {
    if (config) {
      this.query = config;
      this.currentPage = 1;
      this.runQuery();
    }
  }

  runQuery(): void {
    this.loading = true;
    this.results = [];

    if (this.limit) {
      this.query.filters.limit = this.limit;
      this.query.filters.offset = this.limit * (this.currentPage - 1);
    }

    this.articlesService.query(this.query).subscribe((data) => {
      this.loading = false;
      this.results = data.articles;
    });
  }

  setPageTo(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.runQuery();
  }

  ngOnInit(): void {}
}

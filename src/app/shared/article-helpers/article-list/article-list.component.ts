import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Article, ArticleListConfig } from 'src/app/core/models';
import { ArticleService } from 'src/app/core/services/article.service';

interface Pagination {
  collectionSize: number;
  page: number;
  pageSize: number;
}

@Component({
  selector: 'article-list',
  templateUrl: './article-list.component.html',
})
export class ArticleListComponent implements OnInit {
  query: ArticleListConfig;
  currentPage = 1;
  loading = false;
  totalPages = 1;
  results: Article[] = [];

  pagination$ = new Subject<Pagination>();

  @Input() limit: number;
  @Input()
  set config(config: ArticleListConfig) {
    if (config) {
      this.query = config;
      this.currentPage = 1;
    }
  }

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    if (this.query) {
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

    this.articleService.query(this.query).subscribe((data) => {
      this.loading = false;
      this.results = data.articles;
      this.totalPages = data.articlesCount;

      this.pagination$.next({
        collectionSize: this.totalPages,
        pageSize: this.limit,
        page: this.currentPage,
      } as Pagination);
    });
  }

  setPageTo(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.runQuery();
  }
}

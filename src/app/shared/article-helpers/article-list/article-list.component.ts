import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ArticleListConfig, Articles } from 'src/app/core/models';
import { ArticlesService } from 'src/app/core/services/articles.service';

@Component({
  selector: 'article-list',
  templateUrl: './article-list.component.html',
})
export class ArticleListComponent implements OnChanges {
  @Input() limit = 5;
  @Input() config: ArticleListConfig;

  articles$: Observable<Articles>;
  private pagination = {
    currentPage: 1,
    limit: this.limit,
    totalPages: 0,
    offset: 0,
  };

  constructor(
    private articlesService: ArticlesService //
  ) {}

  private updatePagination(): void {
    // this.pagination.limit = this.limit;
    this.pagination.offset =
      this.pagination.limit * (this.pagination.currentPage - 1);
  }

  private getSearchCondition(): ArticleListConfig {
    this.updatePagination();

    return {
      type: this.config.type,
      filters: {
        ...this.config.filters,
        limit: this.pagination.limit,
        offset: this.pagination.offset,
      },
    } as ArticleListConfig;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.articles$ = this.articlesService
      .getArticles(this.getSearchCondition())
      .pipe(
        tap((data: Articles) => {
          this.pagination.totalPages = Math.ceil(
            data.articlesCount / this.limit
          );
        })
      );
  }
}

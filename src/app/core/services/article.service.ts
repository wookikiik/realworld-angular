import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iif, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Article, ArticleListConfig } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private apiService: ApiService) {}

  query(
    config: ArticleListConfig
  ): Observable<{ articles: Article[]; articlesCount: number }> {
    const fromObject: { [key: string]: any } = Object.keys(
      config.filters
    ).reduce((params, key) => {
      params[key] = config.filters[key];
      return params;
    }, {});

    return this.apiService.get(
      `/articles${config.type === 'feed' ? '/feed' : ''}`,
      new HttpParams({ fromObject })
    );
  }

  get(slug: string): Observable<Article> {
    return this.apiService
      .get(`/articles/${slug}`)
      .pipe(map((data) => data.article));
  }

  destory(slug: string): Observable<Article> {
    return this.apiService.delete(`/articles/${slug}`);
  }

  save(article: Article): Observable<Article> {
    return of(article).pipe(
      mergeMap((source) =>
        iif(
          () => source.slug !== null && source.slug !== undefined,
          this.apiService.put(`/articles/${source.slug}`, { article: source }),
          this.apiService.post(`/articles`, { article: source })
        )
      ),
      map((data) => data.article)
    );
  }

  favorite(slug: string): Observable<Article> {
    return this.apiService.post(`/articles/${slug}/favorite`);
  }

  unfavorite(slug: string): Observable<Article> {
    return this.apiService.delete(`/articles/${slug}/favorite`);
  }
}

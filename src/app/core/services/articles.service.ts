import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article, ArticleListConfig, Articles } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private api: ApiService) {}

  getArticles(config: ArticleListConfig): Observable<Articles> {
    const path = `/api/articles${config.type === 'feed' ? '/feed' : ''}`;
    const params = Object.keys(config.filters).reduce((returnParams, key) => {
      return { ...returnParams, key: config.filters[key] };
    }, {});
    return this.api.get(path, params);
  }

  getArticle(slug: string): Observable<Article> {
    return this.api
      .get(`/api/artiles/${slug}`)
      .pipe(map((data: { article: Article }) => data.article));
  }

  createArticle(article: Article): Observable<Article> {
    return this.api
      .post('/api/artiles', article)
      .pipe(map((data: { article: Article }) => data.article));
  }

  updateArticle(slug: string, article: Article): Observable<Article> {
    return this.api
      .put(`/api/artiles/${slug}`, article)
      .pipe(map((data: { article: Article }) => data.article));
  }

  deleteArticle(slug: string): Observable<boolean> {
    return this.api
      .delete(`/api/artiles/${slug}`)
      .pipe(map((data: { success: boolean }) => data.success));
  }

  favoriteArticle(slug: string): Observable<Article> {
    return this.api
      .post(`/api/artiles/${slug}/favorite`)
      .pipe(map((data: { article: Article }) => data.article));
  }

  unfavoriteArticle(slug: string): Observable<Article> {
    return this.api
      .delete(`/api/artiles/${slug}/favorite`)
      .pipe(map((data: { article: Article }) => data.article));
  }
}

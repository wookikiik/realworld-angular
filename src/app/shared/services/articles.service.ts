import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article } from 'src/app/models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private apiService: ApiService) {}

  get(slug: string): Observable<Article> {
    return this.apiService
      .get(`/articles/${slug}`)
      .pipe(map((data) => data.article));
  }

  save(article: Article): Observable<Article> {
    if (article.slug) {
      return this.apiService.put(`/articles/${article.slug}`, { article });
    } else {
      return this.apiService
        .post(`/articles`, { article })
        .pipe(map((data: { article: Article }) => data.article));
    }
  }

  destory(slug: string): Observable<boolean> {
    return this.apiService.delete(`/articles/${slug}`);
  }

  favorite(slug: string): Observable<Article> {
    return this.apiService.post(`/articles/${slug}/favorite`);
  }

  unfavorite(slug: string): Observable<Article> {
    return this.apiService.delete(`/articles/${slug}/favorite`);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comment } from '../../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private apiService: ApiService) {}

  add(slug: string, payload: any): Observable<Comment> {
    return this.apiService
      .post(`/articles/${slug}/comments`, {
        comment: { body: payload },
      })
      .pipe(map((data: { comment: Comment }) => data.comment));
  }

  getAll(slug: string): Observable<Comment[]> {
    return this.apiService
      .get(`/articles/${slug}/comments`)
      .pipe(map((data: { comments: Comment[] }) => data.comments));
  }

  destory(commentId: number, articleSlug: string): Observable<boolean> {
    return this.apiService.delete(
      `/articles/${articleSlug}/comments/${commentId}`
    );
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comment } from '../models/comment.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private apiService: ApiService) {}

  getComments(slug: string): Observable<Comment[]> {
    return this.apiService
      .get(`/articles/${slug}/comments`)
      .pipe(map((data: { comments: Comment[] }) => data.comments));
  }

  addComments(slug: string, comment: string): Observable<Comment> {
    return this.apiService
      .post(`/articles/${slug}/comments`, {
        comment: { body: comment },
      })
      .pipe(map((data: { comment: Comment }) => data.comment));
  }

  deleteComments(slug: string, commentId: number): Observable<boolean> {
    return this.apiService.delete(`/articles/${slug}/comments/${commentId}`);
  }
}

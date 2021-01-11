import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comment, Comments } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private api: ApiService) {}

  addComments(slug: string, comment: Comment): Observable<Comment> {
    return this.api
      .post('/api/artiles', { comment })
      .pipe(map((data: { comment: Comment }) => data.comment));
  }

  getComments(slug: string, comment: Comment): Observable<Comments> {
    return this.api
      .get(`/api/articles/${slug}/comments`)
      .pipe(map((data: { comments: Comments }) => data.comments));
  }

  deleteComments(slug: string, commentId: string): Observable<boolean> {
    return this.api
      .delete(`/api/articles/${slug}/comments/${commentId}`)
      .pipe(map((data: { success: boolean }) => data.success));
  }
}

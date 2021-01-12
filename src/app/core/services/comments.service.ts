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

  getComments(slug: string): Observable<Comments> {
    return this.api.get(`/articles/${slug}/comments`);
  }

  addComment(slug: string, comment: Comment): Observable<Comment> {
    return this.api
      .post(`/articles/${slug}/comments`, { comment })
      .pipe(map((data: { comment: Comment }) => data.comment));
  }

  deleteComments(slug: string, commentId: string): Observable<boolean> {
    return this.api
      .delete(`/articles/${slug}/comments/${commentId}`)
      .pipe(map((data: { success: boolean }) => data.success));
  }
}

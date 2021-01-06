import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Article, Comment, Errors, User } from '../core/models';
import { ArticleService } from '../core/services/article.service';
import { CommentsService } from '../core/services/comments.service';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'article-page',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  isAuthor: boolean;
  isDeleting = false;
  isSubmitting = false;
  article: Article;
  currentUser: User;
  comments: Comment[];
  commentBody = new FormControl();
  commentErrors: Errors = {} as Errors;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private articleService: ArticleService,
    private commentsService: CommentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.data //
      .pipe(map((data) => data.article)) //
      .subscribe((article) => {
        this.article = article;
        this.populateComments();
      });

    this.userService.currentUser //
      .subscribe((user) => {
        this.isAuthor = this.article.author.username === user.username;
        this.currentUser = user;
      });
  }

  private populateComments(): void {
    this.commentsService
      .getComments(this.article.slug) //
      .subscribe((comments) => {
        this.comments = comments;
      });
  }

  deleteArticle(): void {
    this.isDeleting = true;
    this.articleService.destory(this.article.slug).subscribe((_) => {
      this.router.navigateByUrl('/');
    });
  }

  toggleFavorite(favorited: boolean): void {
    this.article.favorited = favorited;
    favorited //
      ? this.article.favoritesCount++ //
      : this.article.favoritesCount--;
  }

  toggleFollow(following: boolean): void {
    this.article.author.following = following;
  }

  addComment(): void {
    this.isSubmitting = true;
    this.commentsService
      .addComments(this.article.slug, this.commentBody.value) //
      .subscribe(
        (comment) => {
          this.commentBody.reset('');
          this.isSubmitting = false;
          this.comments.unshift(comment);
        },
        (err) => {
          this.isSubmitting = false;
          this.commentErrors = err;
        }
      );
  }

  deleteComment(deleted: boolean, comment: Comment): void {
    if (deleted) {
      this.commentsService
        .deleteComments(this.article.slug, comment.id)
        .subscribe((isSuccess) => {
          this.comments = this.comments.filter(
            (target) => target.id !== comment.id
          );
        });
    }
  }
}

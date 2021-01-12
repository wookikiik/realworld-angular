import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article, Comment, Comments, Errors, User } from '../core/models';
import { ArticlesService } from '../core/services/articles.service';
import { CommentsService } from '../core/services/comments.service';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'article-page',
  templateUrl: './article.component.html',
})
export class ArticleComponent implements OnInit {
  constructor(
    private route: ActivatedRoute, //
    private router: Router,
    private userService: UserService,
    private articlesService: ArticlesService,
    private commentsService: CommentsService
  ) {}

  article: Article;
  comments: Comment[] = [];
  isDeleting = false;
  isOwner = false;
  needLogin = true;
  owner: User = {} as User;
  comment = new FormControl();
  error: Errors;

  ngOnInit(): void {
    this.route.data
      .pipe(map((data) => data.article))
      .subscribe((article: Article) => {
        this.article = article;
      });

    zip(
      this.userService.currentUser,
      this.userService.isAuthenticated
    ).subscribe(([user, isAuthenticated]) => {
      if (isAuthenticated) {
        this.owner = user;
        this.isOwner = this.article.author.username === user.username;
      }
      this.needLogin = !isAuthenticated;
    });

    this.commentsService
      .getComments(this.article.slug)
      .pipe(map((data: Comments) => data.comments))
      .subscribe((comments) => (this.comments = comments));
  }

  postComment(): void {
    this.error = null;
    const comment = this.comment.value;
    this.commentsService
      .addComment(this.article.slug, {
        body: comment,
      } as Comment)
      .subscribe(
        (post) => {
          this.comment.reset();
          this.comments.unshift(post);
        },
        (err) => (this.error = err)
      );
  }

  deleteArticle(): void {
    this.isDeleting = true;
    this.articlesService
      .deleteArticle(this.article.slug) //
      .subscribe(
        (_) => {
          this.isDeleting = false;
          this.router.navigateByUrl('/');
        },
        (er) => (this.isDeleting = false)
      );
  }

  onTriggerFollow(followed: boolean): void {
    this.article.author.following = followed;
  }

  onTriggerFavorite(favorited: boolean): void {
    this.article.favorited = favorited;
    favorited //
      ? this.article.favoritesCount++
      : this.article.favoritesCount--;
  }
}

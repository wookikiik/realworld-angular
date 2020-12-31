import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article, Comment, Errors, User } from '../models';
import { ArticlesService, CommentsService, UserService } from '../shared';

@Component({
  selector: 'article-page',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  article: Article;
  currentUser: User;
  canModify: boolean;
  isSubmitting = false;
  isDeleting = false;
  comments: Comment[];
  commentControl = new FormControl();
  commentFormErrors = {} as Errors;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticlesService,
    private router: Router,
    private userService: UserService,
    private commentsService: CommentsService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: { article: Article }) => {
      this.article = data.article;
      this.populateComments();
    });

    this.userService.currentUser.subscribe((user: User) => {
      this.currentUser = user;
      this.canModify =
        this.currentUser.username === this.article.author.username;
    });
  }

  onToggleFollowing(following: boolean): void {
    this.article.author.following = following;
  }

  onToggleFavorite(favorite: boolean): void {
    this.article.favorited = favorite;
  }

  deleteArticle(): void {
    this.isDeleting = true;
    this.articleService.destory(this.article.slug).subscribe((success) => {
      this.router.navigateByUrl('/');
    });
  }

  populateComments(): void {
    this.commentsService
      .getAll(this.article.slug)
      .subscribe((comments) => (this.comments = comments));
  }

  addComment(): void {
    this.isSubmitting = true;
    this.commentFormErrors = {} as Errors;

    const commentBody = this.commentControl.value;
    this.commentsService.add(this.article.slug, commentBody).subscribe(
      (comment) => {
        this.comments.unshift(comment);
        this.commentControl.reset('');
        this.isSubmitting = false;
      },
      (errors) => {
        this.isSubmitting = false;
        this.commentFormErrors = errors;
      }
    );
  }

  onDeleteComment(comment: Comment): void {
    this.commentsService
      .destory(comment.id, this.article.slug)
      .subscribe((success) => {
        this.comments = this.comments.filter((item) => item !== comment);
      });
  }
}

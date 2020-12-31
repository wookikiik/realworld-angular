import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article, User } from '../models';
import { ArticlesService, UserService } from '../shared';

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

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticlesService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: { article: Article }) => {
      this.article = data.article;
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
}

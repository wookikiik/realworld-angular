import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models';
import { ArticlesService, UserService } from '../../services';

@Component({
  selector: 'favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.css'],
})
export class FavoriteButtonComponent implements OnInit {
  constructor(
    private articleService: ArticlesService,
    private router: Router,
    private userService: UserService
  ) {}

  @Input() article: Article;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  ngOnInit(): void {}

  toggleFavorite(): void {
    this.isSubmitting = true;
    this.userService.isAuthenticated.subscribe((isAuthenticated) => {
      if (!isAuthenticated) {
        this.router.navigateByUrl('/login');
        return;
      }

      if (!this.article.favorited) {
        this.articleService.favorite(this.article.slug).subscribe(
          (data) => {
            this.isSubmitting = false;
            this.toggle.emit(true);
          },
          (err) => (this.isSubmitting = false)
        );
      } else {
        this.articleService.unfavorite(this.article.slug).subscribe(
          (data) => {
            this.isSubmitting = false;
            this.toggle.emit(false);
          },
          (err) => (this.isSubmitting = false)
        );
      }
    });
  }
}

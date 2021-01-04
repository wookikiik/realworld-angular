import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { iif, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Article } from 'src/app/core/models';
import { ArticleService } from 'src/app/core/services/article.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'favorite-button',
  templateUrl: './favorite-button.component.html',
})
export class FavoriteButtonComponent implements OnInit {
  @Input() article: Article;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  constructor(
    private articleService: ArticleService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  toggleFavority(): void {
    this.isSubmitting = true;
    this.userService.isAuthenticated //
      .subscribe((isAuthenticated) => {
        if (!isAuthenticated) {
          this.isSubmitting = false;
          this.router.navigateByUrl('/login');
        }

        of(this.article)
          .pipe(
            mergeMap((article) =>
              iif(
                () => article.favorited,
                this.articleService.unfavorite(article.slug),
                this.articleService.favorite(article.slug)
              )
            )
          )
          .subscribe(
            (article) => {
              this.toggle.emit(article.favorited);
              this.isSubmitting = false;
            },
            (err) => (this.isSubmitting = false)
          );
      });
  }
}

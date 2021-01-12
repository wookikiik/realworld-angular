import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { iif, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Article } from 'src/app/core/models';
import { ArticlesService } from 'src/app/core/services/articles.service';

@Component({
  selector: 'favorite-button',
  templateUrl: './favorite-button.component.html',
})
export class FavoriteButtonComponent {
  @Input() article: Article;
  @Input() needLogin: boolean;
  @Output() trigger = new EventEmitter<boolean>();

  constructor(
    private articlesService: ArticlesService, //
    private router: Router
  ) {}

  onTrigger(): void {
    if (this.needLogin) {
      this.router.navigateByUrl('/login');
      return;
    }

    of(this.article) //
      .pipe(
        mergeMap((article) =>
          iif(
            () => article.favorited,
            this.articlesService.unfavoriteArticle(article.slug),
            this.articlesService.favoriteArticle(article.slug)
          )
        )
      )
      .subscribe((article) => {
        this.trigger.emit(article.favorited);
      });
  }
}

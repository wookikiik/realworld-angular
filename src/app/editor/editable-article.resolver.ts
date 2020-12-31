import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Article } from '../models';
import { ArticlesService, UserService } from '../shared';

@Injectable()
export class EditableResolver implements Resolve<boolean> {
  constructor(
    private articleService: ArticlesService,
    private router: Router,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.articleService.get(route.params.slug).pipe(
      map((article: Article) => {
        if (
          this.userService.getCurrentUser().username === article.author.username
        ) {
          return article;
        } else {
          this.router.navigateByUrl('/');
        }
      }),
      catchError((_) => this.router.navigateByUrl('/'))
    );
  }
}

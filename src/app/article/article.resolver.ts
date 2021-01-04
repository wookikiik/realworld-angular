import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Article } from '../core/models';
import { ArticleService } from '../core/services/article.service';

@Injectable()
export class ArticleResolver implements Resolve<Article> {
  constructor(private articleService: ArticleService, private router: Router) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.articleService
      .get(route.params.slug)
      .pipe(catchError((_) => this.router.navigateByUrl('/')));
  }
}

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ArticlesService } from '../shared';

@Injectable()
export class ArticleResolver implements Resolve<any> {
  constructor(
    private router: Router,
    private articleService: ArticlesService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.articleService
      .get(route.params.slug)
      .pipe(catchError((err) => this.router.navigateByUrl('/')));
  }
}

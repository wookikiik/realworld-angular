import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Article } from '../models';
import { ArticlesService } from '../services/articles.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleResolver implements Resolve<Article | boolean> {
  constructor(
    private articlesService: ArticlesService, //
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Article | boolean> {
    return this.articlesService
      .getArticle(route.paramMap.get('slug'))
      .pipe(catchError((err) => this.router.navigateByUrl('/')));
  }
}

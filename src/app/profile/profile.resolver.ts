import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProfilesService } from '../shared';

@Injectable()
export class ProfileResolver implements Resolve<boolean> {
  constructor(
    private profileService: ProfilesService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.profileService.get(route.params.username).pipe(
      catchError((err) => {
        console.log(err);
        return this.router.navigateByUrl('/');
      })
    );
  }
}

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Profile } from '../core/models';
import { ProfileService } from '../core/services/profile.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileResolver implements Resolve<Profile> {
  constructor(private profileService: ProfileService, private router: Router) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.profileService
      .get(route.params.username)
      .pipe(catchError((err) => this.router.navigateByUrl('/')));
  }
}

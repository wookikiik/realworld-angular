import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Profile } from '../models';
import { ProfilesService } from '../services/profiles.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileResolver implements Resolve<Profile | boolean> {
  constructor(
    private profilesService: ProfilesService, //
    private router: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Profile | boolean> {
    return this.profilesService
      .getProfile(route.paramMap.get('username')) //
      .pipe(catchError((err) => this.router.navigateByUrl('/')));
  }
}

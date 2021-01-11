import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Profile } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProfilesService {
  constructor(private api: ApiService) {}

  getProfile(username: string): Observable<Profile> {
    return this.api
      .get(`/api/profiles/${username}`) //
      .pipe(map((data: { profile: Profile }) => data.profile));
  }

  followUser(username: string): Observable<Profile> {
    return this.api
      .post(`/api/profiles/${username}/follow`) //
      .pipe(map((data: { profile: Profile }) => data.profile));
  }

  unfollowUser(username: string): Observable<Profile> {
    return this.api
      .delete(`/api/profiles/${username}/follow`) //
      .pipe(map((data: { profile: Profile }) => data.profile));
  }
}

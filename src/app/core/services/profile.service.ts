import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Profile } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private apiService: ApiService) {}

  get(username: string): Observable<Profile> {
    return this.apiService
      .get(`/profiles/${username}`)
      .pipe(map((data) => data.profile));
  }

  follow(username: string): Observable<Profile> {
    return this.apiService
      .post(`/profiles/${username}/follow`)
      .pipe(map((data) => data.profile));
  }

  unfollow(username: string): Observable<Profile> {
    return this.apiService
      .delete(`/profiles/${username}/follow`)
      .pipe(map((data) => data.profile));
  }
}

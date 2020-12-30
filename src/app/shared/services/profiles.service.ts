import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Profile } from 'src/app/models';
import { ApiService } from './api.service';

@Injectable()
export class ProfilesService {
  constructor(private apiService: ApiService) {}

  get(username: string): Observable<Profile> {
    return this.apiService
      .get('/profiles/' + username)
      .pipe(map((data: { profile: Profile }) => data.profile));
  }
}

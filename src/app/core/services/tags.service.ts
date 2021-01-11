import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tags } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor(private api: ApiService) {}
  getTags(): Observable<Tags> {
    return this.api
      .get('/api/tags')
      .pipe(map((data: { tags: Tags }) => data.tags));
  }
}

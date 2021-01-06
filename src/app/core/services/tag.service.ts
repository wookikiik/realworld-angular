import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor(private apiService: ApiService) {}

  getAllTag(): Observable<string[]> {
    return this.apiService
      .get('/tags')
      .pipe(map((data: { tags: string[] }) => data.tags));
  }
}

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tags } from '../models';
import { TagsService } from './tags.service';

const mockTags = ['test1', 'test2', 'test3'];

class MockApiService {
  get(): Observable<Tags> {
    return of({ tags: mockTags });
  }
}
describe('TagsService', () => {
  let service: TagsService;

  beforeEach(() => {
    service = new TagsService(new MockApiService() as any);
  });

  it('태그 전체 조회', () => {
    service
      .getTags()
      .pipe(map((tags: Tags) => tags.tags))
      .subscribe((tags) => {
        expect(tags).toEqual(mockTags);
      });
  });
});

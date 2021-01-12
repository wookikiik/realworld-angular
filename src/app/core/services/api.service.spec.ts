import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let apiService: ApiService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'put',
      'delete',
    ]);
    apiService = new ApiService(httpClientSpy as any);
  });

  it('API get 정상 조회', () => {
    const expectPayload = { data: 'test' };
    const errorPayload = { test: 'error' };
    httpClientSpy.get.and.returnValues(
      of(expectPayload),
      throwError({ error: errorPayload })
    );
    apiService.get('/test').subscribe(
      (payload) => {
        expect(payload).toEqual(expectPayload, 'API 정상 조회');
      },
      (err) => {
        expect(err).toEqual(errorPayload, 'API 정상 조회');
      }
    );
  });
});

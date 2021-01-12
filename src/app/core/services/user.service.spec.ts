import { inject, TestBed } from '@angular/core/testing';
import { of, zip } from 'rxjs';
import { User } from '../models';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { UserService } from './user.service';

class MockJwtService {
  setToken(token: string): void {}
  getToken(): string {
    return 'mock_token';
  }
}

describe('UserService', () => {
  let userService: UserService;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const apiSpy = jasmine.createSpyObj('ApiService', ['post']);

    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: ApiService, useValue: apiSpy }, //
        { provide: JwtService, useClass: MockJwtService }, //
      ],
    });

    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    userService = TestBed.inject(UserService);
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  it('로그인 성공 후 인증 확인', () => {
    const expectedUser = {
      username: 'test',
      email: 'test@test.com',
      token: 'mock_token',
    } as User;

    apiService.post.and.returnValue(of({ user: expectedUser }));

    userService.login(expectedUser).subscribe((user) => {
      expect(user).toEqual(expectedUser, '성공적으로 가입됨.');
      userService.isAuthenticated.subscribe((isAuthenticated) => {
        expect(isAuthenticated).toEqual(true, '회원 인증됨.');
      });
    });
  });
});

describe('회원 인증 테스트 >> ', () => {
  let userService: UserService;
  let jwtService: jasmine.SpyObj<JwtService>;
  let apiService: jasmine.SpyObj<ApiService>;
  const expectUser = { username: 'mock' } as User;

  beforeEach(() => {
    const jwtSpy = jasmine.createSpyObj('JwtService', [
      'getToken',
      'purgeToken',
    ]);
    const apiSpy = jasmine.createSpyObj('ApiService', ['get']);

    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: ApiService, useValue: apiSpy }, //
        { provide: JwtService, useValue: jwtSpy }, //
      ],
    });

    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    jwtService = TestBed.inject(JwtService) as jasmine.SpyObj<JwtService>;
    userService = TestBed.inject(UserService);
  });

  it('인증된 회원', () => {
    apiService.get.and.returnValue(of({ user: expectUser }));
    jwtService.getToken.and.returnValue('mock_token');

    userService.populate();
    zip(
      userService.currentUser, //
      userService.isAuthenticated
    ).subscribe(([user, isAuthenticated]) => {
      expect(user).toEqual(expectUser, '인증된 회원');
      expect(isAuthenticated).toBeTruthy('인증 확인 됨');
    });
  });

  it('비 인증된 회원', () => {
    jwtService.getToken.and.returnValue(null);

    userService.populate();
    zip(
      userService.currentUser, //
      userService.isAuthenticated
    ).subscribe(([user, isAuthenticated]) => {
      expect(user).toBeNull();
      expect(isAuthenticated).toBeFalsy('비 인증 확인 됨');
    });
  });
});

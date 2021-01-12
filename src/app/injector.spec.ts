import { InjectionToken, Injector } from '@angular/core';

function reverse(val: boolean): any {
  return () => !val;
}

describe('Injector testing...', () => {
  let guard: Injector;
  const NoAuthGuard = new InjectionToken<boolean>('NoAuthGuard');
  const ValToken = new InjectionToken<boolean>('ValToken', {
    factory: () => false,
  });

  console.log(ValToken.toString());

  beforeEach(async () => {
    guard = await Injector.create({
      providers: [
        {
          provide: NoAuthGuard,
          useFactory: reverse(true),
        },
      ],
    });
  });

  it('inject...', () => {
    expect(guard.get(NoAuthGuard)).toBeFalse();
  });
});

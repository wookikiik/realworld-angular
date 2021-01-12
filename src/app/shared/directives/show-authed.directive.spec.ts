import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ShowAuthedDirective } from './show-authed.directive';

@Component({})
class TestComponent {}

function createTestComponent(
  template: string
): ComponentFixture<TestComponent> {
  return TestBed.overrideComponent(TestComponent, {
    set: { template },
  }).createComponent(TestComponent);
}

describe('ShowAuthed Directive', () => {
  let fixture: ComponentFixture<TestComponent>;

  afterEach(() => {
    fixture = null;
  });

  beforeEach(() => {
    // ShowAuthedDirective
    TestBed.configureTestingModule({
      declarations: [ShowAuthedDirective, TestComponent],
    });
  });

  it(
    '인증된 회원에게 전시',
    waitForAsync(() => {
      const template = `<span *showAuthed="true">hello</span>`;
      fixture = createTestComponent(template);
      fixture.detectChanges();
      const bannerDe: DebugElement = fixture.debugElement;
      // const bannerEl: HTMLElement = bannerDe.nativeElement;
      expect(bannerDe.queryAll(By.css('span')).length).toEqual(1);
      expect(fixture.nativeElement.textContent).toEqual('hello');
    })
  );

  it(
    '비인증된 회원에게 미전시',
    waitForAsync(() => {
      const template = `<span *showAuthed="false">hello</span>`;
      fixture = createTestComponent(template);
      fixture.detectChanges();
      const bannerDe: DebugElement = fixture.debugElement;
      // const bannerEl: HTMLElement = bannerDe.nativeElement;
      expect(bannerDe.queryAll(By.css('span')).length).toEqual(0);
    })
  );
});

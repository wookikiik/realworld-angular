import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowProfileButtonComponent } from './follow-profile-button.component';

describe('FollowProfileButtonComponent', () => {
  let component: FollowProfileButtonComponent;
  let fixture: ComponentFixture<FollowProfileButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowProfileButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowProfileButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

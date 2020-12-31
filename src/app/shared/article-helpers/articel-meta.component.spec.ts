import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticelMetaComponent } from './articel-meta.component';

describe('ArticelMetaComponent', () => {
  let component: ArticelMetaComponent;
  let fixture: ComponentFixture<ArticelMetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticelMetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticelMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

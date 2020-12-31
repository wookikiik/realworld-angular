import { TestBed } from '@angular/core/testing';
import { EditableResolver } from './editable-article.resolver';

describe('EditableResolver', () => {
  let resolver: EditableResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(EditableResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

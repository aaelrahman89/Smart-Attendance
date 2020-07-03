import { TestBed } from '@angular/core/testing';

import { StudentRelativeRelationService } from './student-relative-relation.service';

describe('StudentRelativeRelationService', () => {
  let service: StudentRelativeRelationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentRelativeRelationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

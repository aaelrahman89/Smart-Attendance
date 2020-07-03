import { TestBed } from '@angular/core/testing';

import { FacultyMemberEnrollmentService } from './faculty-member-enrollment.service';

describe('FacultyMemberEnrollmentService', () => {
  let service: FacultyMemberEnrollmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacultyMemberEnrollmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

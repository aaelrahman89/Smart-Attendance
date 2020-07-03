import { TestBed } from '@angular/core/testing';

import { AcademicDepartmentsService } from './academic-departments.service';

describe('AcademicDepartmentsService', () => {
  let service: AcademicDepartmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcademicDepartmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { FacultyFilterModelService } from './faculty-filter-model.service';

describe('FacultyFilterModelService', () => {
  let service: FacultyFilterModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacultyFilterModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

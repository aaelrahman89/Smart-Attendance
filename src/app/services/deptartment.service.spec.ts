import { TestBed } from '@angular/core/testing';

import { DeptartmentService } from './deptartment.service';

describe('DeptartmentService', () => {
  let service: DeptartmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeptartmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

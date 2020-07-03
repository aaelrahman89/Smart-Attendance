import { TestBed } from '@angular/core/testing';

import { LectureTypeService } from './lecture-type.service';

describe('LectureTypeService', () => {
  let service: LectureTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LectureTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

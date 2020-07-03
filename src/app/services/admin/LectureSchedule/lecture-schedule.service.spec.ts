import { TestBed } from '@angular/core/testing';

import { LectureScheduleService } from './lecture-schedule.service';

describe('LectureScheduleService', () => {
  let service: LectureScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LectureScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

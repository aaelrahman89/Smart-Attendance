import { TestBed } from '@angular/core/testing';

import { CurrentTermService } from './current-term.service';

describe('CurrentTermService', () => {
  let service: CurrentTermService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentTermService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

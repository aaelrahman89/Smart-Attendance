import { TestBed } from '@angular/core/testing';

import { AhmedRerenderService } from './ahmed-rerender.service';

describe('AhmedRerenderService', () => {
  let service: AhmedRerenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AhmedRerenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

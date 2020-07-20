import { TestBed } from '@angular/core/testing';

import { TermInterceptorService } from './term-interceptor.service';

describe('TermInterceptorService', () => {
  let service: TermInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TermInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

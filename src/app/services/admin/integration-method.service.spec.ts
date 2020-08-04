import { TestBed } from '@angular/core/testing';

import { IntegrationMethodService } from './integration-method.service';

describe('IntegrationMethodService', () => {
  let service: IntegrationMethodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntegrationMethodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

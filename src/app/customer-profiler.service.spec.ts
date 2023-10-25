import { TestBed } from '@angular/core/testing';

import { CustomerProfilerService } from './customer-profiler.service';

describe('CustomerProfilerService', () => {
  let service: CustomerProfilerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerProfilerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

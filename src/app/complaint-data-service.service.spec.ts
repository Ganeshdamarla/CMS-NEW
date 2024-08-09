import { TestBed } from '@angular/core/testing';

import { ComplaintDataService } from './complaint-data-service.service';

describe('ComplaintDataServiceService', () => {
  let service: ComplaintDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComplaintDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

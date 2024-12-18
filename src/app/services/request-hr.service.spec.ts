import { TestBed } from '@angular/core/testing';

import { RequestHrService } from './request-hr.service';

describe('RequestHrService', () => {
  let service: RequestHrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestHrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { SendurlService } from './sendurl.service';

describe('SendurlService', () => {
  let service: SendurlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendurlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

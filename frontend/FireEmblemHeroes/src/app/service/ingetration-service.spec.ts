import { TestBed } from '@angular/core/testing';

import { IngetrationService } from './ingetration-service';

describe('IngetrationService', () => {
  let service: IngetrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngetrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { MandatServiceService } from './mandat-service.service';

describe('MandatServiceService', () => {
  let service: MandatServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MandatServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

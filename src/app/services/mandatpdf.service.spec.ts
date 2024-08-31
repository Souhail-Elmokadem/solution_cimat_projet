import { TestBed } from '@angular/core/testing';

import { MandatpdfService } from './mandatpdf.service';

describe('MandatpdfService', () => {
  let service: MandatpdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MandatpdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

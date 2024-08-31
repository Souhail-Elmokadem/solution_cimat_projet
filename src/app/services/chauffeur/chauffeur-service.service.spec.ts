import { TestBed } from '@angular/core/testing';

import { ChauffeurServiceService } from './chauffeur-service.service';

describe('ChauffeurServiceService', () => {
  let service: ChauffeurServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChauffeurServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

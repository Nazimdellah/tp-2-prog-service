import { TestBed } from '@angular/core/testing';

import { BandsInTownService } from './bands-in-town.service';

describe('BandsInTownService', () => {
  let service: BandsInTownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BandsInTownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

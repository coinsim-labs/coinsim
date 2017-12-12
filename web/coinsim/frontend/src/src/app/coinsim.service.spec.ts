import { TestBed, inject } from '@angular/core/testing';

import { CoinsimService } from './coinsim.service';

describe('CoinsimService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoinsimService]
    });
  });

  it('should be created', inject([CoinsimService], (service: CoinsimService) => {
    expect(service).toBeTruthy();
  }));
});

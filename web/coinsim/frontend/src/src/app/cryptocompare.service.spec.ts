import { TestBed, inject } from '@angular/core/testing';

import { CryptoCompareService } from './cryptocompare.service';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';

fdescribe('CryptoCompareService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [CryptoCompareService]
    });
  });

  it('should be created', inject([CryptoCompareService], (service: CryptoCompareService) => {
    expect(service).toBeTruthy();
  }));
  
  describe('CryptoCompare.singleCryptoPrice', () => {
     it('returns a BTC price for USD', ((done) => {
        inject([CryptoCompareService], (service: CryptoCompareService) => {
            service.singleCryptoPrice('USD', 'BTC').subscribe((result) => {
                expect(result.BTC).toEqual(jasmine.any(Number));
                done();
            });
        })();
     }));
    
     it('returns multiple crypto prices for USD', ((done) => {
      inject([CryptoCompareService], (service: CryptoCompareService) => {
          service.singleCryptoPrice('USD', 'BTC,ETH,LTC').subscribe((result) => {
              expect(result.BTC).toEqual(jasmine.any(Number));
              expect(result.ETH).toEqual(jasmine.any(Number));
              expect(result.LTC).toEqual(jasmine.any(Number));
              done();
          });
      })();
    }));
    
  });
  
  describe('CryptoCompare.multiCryptoPrice', () => {
     it('returns a BTC price nested below USD', ((done) => {
        inject([CryptoCompareService], (service: CryptoCompareService) => {
            service.multiCryptoPrice('USD', 'BTC').subscribe((result) => {
                expect(result.USD.BTC).toEqual(jasmine.any(Number));
                done();
            });
        })();
     }));
    
     it('returns multiple crypto "to" prices for USD', ((done) => {
      inject([CryptoCompareService], (service: CryptoCompareService) => {
          service.multiCryptoPrice('USD', 'BTC,ETH,LTC').subscribe((result) => {
              expect(result.USD.BTC).toEqual(jasmine.any(Number));
              expect(result.USD.ETH).toEqual(jasmine.any(Number));
              expect(result.USD.LTC).toEqual(jasmine.any(Number));
              done();
          });
      })();
    }));
      
    it('returns multiple "to" crypto prices nested under "from" crytos ', ((done) => {
      inject([CryptoCompareService], (service: CryptoCompareService) => {
          service.multiCryptoPrice('USD,DSH,BCH', 'BTC,ETH,LTC').subscribe((result) => {
              expect(result.USD.BTC).toEqual(jasmine.any(Number));
              expect(result.USD.ETH).toEqual(jasmine.any(Number));
              expect(result.USD.LTC).toEqual(jasmine.any(Number));
              
              expect(result.DSH.BTC).toEqual(jasmine.any(Number));
              expect(result.DSH.ETH).toEqual(jasmine.any(Number));
              expect(result.DSH.LTC).toEqual(jasmine.any(Number));
              
              expect(result.BCH.BTC).toEqual(jasmine.any(Number));
              expect(result.BCH.ETH).toEqual(jasmine.any(Number));
              expect(result.BCH.LTC).toEqual(jasmine.any(Number));
              
              done();
          });
      })();
    }));
  });
  
  describe('CryptoCompare.priceHistorical', () => {
     it('returns a BTC price nested below USD', ((done) => {
        inject([CryptoCompareService], (service: CryptoCompareService) => {
            service.priceHistorical('USD', 'BTC').subscribe((result) => {
                expect(result.USD.BTC).toEqual(jasmine.any(Number));
                done();
            });
        })();
     }));
    
     it('returns multiple crypto "to" prices for USD', ((done) => {
      inject([CryptoCompareService], (service: CryptoCompareService) => {
          service.priceHistorical('USD', 'BTC,ETH,LTC').subscribe((result) => {
              expect(result.USD.BTC).toEqual(jasmine.any(Number));
              expect(result.USD.ETH).toEqual(jasmine.any(Number));
              expect(result.USD.LTC).toEqual(jasmine.any(Number));
              done();
          });
      })();
    }));
    
    it('returns multiple crypto "to" prices for USD with timestamp yesterday', ((done) => {
      inject([CryptoCompareService], (service: CryptoCompareService) => {
          service.priceHistorical('USD', 'BTC,ETH,LTC',  (new Date()).getTime() - 24 * 60 * 60 * 1000).subscribe((result) => {
              expect(result.USD.BTC).toEqual(jasmine.any(Number));
              expect(result.USD.ETH).toEqual(jasmine.any(Number));
              expect(result.USD.LTC).toEqual(jasmine.any(Number));
              done();
          });
      })();
    }));
  });
  
  describe('CryptoCompare.histo', () => {
    const precision = ['minute', 'hour', 'day'];
    for(let timePrecision of precision) {
     it('gets success and data on histo' + timePrecision, ((done) => {
        inject([CryptoCompareService], (service: CryptoCompareService) => {
            service.histo(timePrecision, 'USD', 'BTC').subscribe((result) => {
                expect(result.Response).toEqual('Success');
                expect(result.Data.length).toBeGreaterThan(0);
                done();
            });
        })();
     }));
    
     it('has the number fields time, close, high, low, open, volumefrom, volumeto', ((done) => {
       inject([CryptoCompareService], (service: CryptoCompareService) => {
          service.histo(timePrecision, 'USD', 'BTC').subscribe((result) => {
              expect(result.Data[0].time).toEqual(jasmine.any(Number));
              expect(result.Data[0].close).toEqual(jasmine.any(Number));
              expect(result.Data[0].high).toEqual(jasmine.any(Number));
              expect(result.Data[0].low).toEqual(jasmine.any(Number));
              expect(result.Data[0].open).toEqual(jasmine.any(Number));
              expect(result.Data[0].volumefrom).toEqual(jasmine.any(Number));
              expect(result.Data[0].volumeto).toEqual(jasmine.any(Number));
              done();
          });
       })();
     }));
    
    }
    
    
    it('returns multiple crypto "to" prices for USD with timestamp yesterday', ((done) => {
      inject([CryptoCompareService], (service: CryptoCompareService) => {
          service.priceHistorical('USD', 'BTC,ETH,LTC',  (new Date()).getTime() - 24 * 60 * 60 * 1000).subscribe((result) => {
              expect(result.USD.BTC).toEqual(jasmine.any(Number));
              expect(result.USD.ETH).toEqual(jasmine.any(Number));
              expect(result.USD.LTC).toEqual(jasmine.any(Number));
              done();
          });
      })();
    }));
  });
});

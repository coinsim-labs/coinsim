import { Injectable } from '@angular/core';
import { CoinsimService, Currency } from './coinsim.service';
import 'rxjs/add/operator/map'
import {HttpClient} from "@angular/common/http";

@Injectable()
export class CryptoCompareService {
  private baseURL = 'https://min-api.cryptocompare.com/data/';

  private currencyMap: any;

  constructor(private http: HttpClient, private cs: CoinsimService) {
        // onInit, get current supported currencies
        cs.currencyMap().subscribe(currencies => {
            this.currencyMap = currencies
            console.log('cryptocompare service', this.currencyMap);
        })

   }



    /**
   * https://www.cryptocompare.com/api#-api-data-price-
   *
   */
  singleCryptoPrice(fsym: string, tsyms: string,
        e: string = null, extraParams: string = null,
        sign: boolean = null, tryConversion: boolean = null,
        full: boolean = false) {
    let url = this.baseURL + 'price?';
    url += 'fsym=' + fsym;
    url += '&tsyms=' + tsyms;
    url += e !== null ? '&e=' + e : '';
    url += extraParams !== null ? '&extraParams=' + extraParams : '';
    url += sign !== null ? '&sign=' + sign : '';
    url += tryConversion !== null ? '&tryConversion=' + tryConversion : '';

    return this.http.get(url);
  }

  /**
   * https://www.cryptocompare.com/api#-api-data-price-
   */
  multiCryptoPrice(fsyms: string, tsyms: string,
        e: string = null, extraParams: string = null,
        sign: boolean = null, tryConversion: boolean = null,
        full: boolean = false) {
    let url = this.baseURL + (full ? 'pricemultifull?' : 'pricemulti?');
    url += 'fsyms=' + fsyms;
    url += '&tsyms=' + tsyms;
    url += e !== null ? '&e=' + e : '';
    url += extraParams !== null ? '&extraParams=' + extraParams : '';
    url += sign !== null ? '&sign=' + sign : '';
    url += tryConversion !== null ? '&tryConversion=' + tryConversion : '';

    return this.http.get(url);
  }

    /**
   * https://www.cryptocompare.com/api#-api-data-pricehistorical-
   */
  priceHistorical(fsym: string, tsyms: string, ts: number = null,
        markets: string = null, extraParams: string = null,
        sign: boolean = null, tryConversion: boolean = null,
        full: boolean = false) {
    let url = this.baseURL + 'pricehistorical?';
    url += 'fsym=' + fsym;
    url += '&tsyms=' + tsyms;
    url += markets !== null ? '&markets=' + markets : '';
    url += extraParams !== null ? '&extraParams=' + extraParams : '';
    url += sign !== null ? '&sign=' + sign : '';
    url += tryConversion !== null ? '&tryConversion=' + tryConversion : '';

    return this.http.get(url);
  }

  histo(timePrecision: string, fsym: string, tsym: string,
        e: string = null, extraParams: string = null,
        sign: boolean = null, tryConversion: boolean = null,
        aggregate: number = null, limit: number = null,
        toTs: number = null, allData: boolean = false) {
    let url = this.baseURL + 'histo' + timePrecision + '?';
    url += 'fsym=' + fsym;
    url += '&tsym=' + tsym;
    url += e !== null ? '&e=' + e : '';
    url += extraParams !== null ? '&extraParams=' + extraParams : '';
    url += sign !== null ? '&sign=' + sign : '';
    url += tryConversion !== null ? '&tryConversion=' + tryConversion : '';
    url += aggregate !== null ? '&aggregate=' + aggregate : '';
    url += limit !== null ? '&limit=' + limit : '';
    url += toTs !== null ? '&toTs=' + toTs : '';
    url += allData !== null ? '&allData=' + allData : '';

    return this.http.get(url);
  }

  /**
   * https://www.cryptocompare.com/api#-api-data-histominute-
   */
  histoMinute(fsym: string, tsym: string,
        e: string = null, extraParams: string = null,
        sign: boolean = null, tryConversion: boolean = null,
        aggregate: number = null, limit: number = null,
        toTs: number = null) {
    return this.histo('minute', fsym, tsym,
        e, extraParams,
        sign, tryConversion,
        aggregate, limit,
        toTs)
  }

  /**
   * https://www.cryptocompare.com/api#-api-data-histohour-
   */
  histoHour(fsym: string, tsym: string,
        e: string = null, extraParams: string = null,
        sign: boolean = null, tryConversion: boolean = null,
        aggregate: number = null, limit: number = null,
        toTs: number = null) {
    return this.histo('hour', fsym, tsym,
        e, extraParams,
        sign, tryConversion,
        aggregate, limit,
        toTs)
  }

  /**
   * https://www.cryptocompare.com/api#-api-data-histoday-
   */
  histoDay(fsym: string, tsym: string,
        e: string = null, extraParams: string = null,
        sign: boolean = null, tryConversion: boolean = null,
        aggregate: number = null, limit: number = null,
        toTs: number = null) {
    return this.histo('day', fsym, tsym,
        e, extraParams,
        sign, tryConversion,
        aggregate, limit,
        toTs)
  }

}

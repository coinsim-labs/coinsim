import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { CryptoCompareService } from '../../cryptocompare.service';
import { CoinsimService } from '../../coinsim.service';
import {Router} from "@angular/router";
import { RouterLink } from '@angular/router';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {

  private marketModel;
  private nameObject: Object;

  constructor(private router : Router, private ccs: CryptoCompareService, private cs: CoinsimService ) {

    const array = this.cs.currencyMap().subscribe(currencies => {
      this.nameObject = currencies;
      this.getMarketModel();
      setInterval(() => {
        //this.getMarketModel()
      }, 6000);
    });

    console.log(router.isActive('market', true));
  }

  addHistoricalPricesToModel(currencies, i) {
    currencies.slice(i*10, (i+1)*10).forEach(currency => {
      // Be careful to only subscribe to historicalPrices once because of request limit
      this.marketModel[currency].historicalPrices = this.ccs.histoDay(currency, 'USD',
        null, null, null, null, null,
        6).map((result: any) => result.Data);
    });

    if(i < currencies.length / 10) {
      setTimeout(() => {
        this.addHistoricalPricesToModel(currencies, i+1);
      }, 1000);
    }
  }

  getMarketModel() {
    let symbols = Object.keys(this.nameObject);
    this.ccs.multiCryptoPrice(
      symbols.join(','), 'USD',
      null, 'coinsim', null, null, true).subscribe(
        (Success) => {
          this.onMarketModelSuccess(Success);
          this.addHistoricalPricesToModel(symbols, 0);
        },
        (Error) => {console.log(Error); alert('Failed to get Currencies')}
      );
  }

  onMarketModelSuccess(Success: Object) {
    if (Success.hasOwnProperty('RAW')) {
      const newModel = Success['RAW'];
      const oldModel = this.marketModel;
      for(const k in newModel) {
          // set name
          newModel[k].NAME = k;

          // setPercentclass
          if (newModel[k].USD.CHANGEPCT24HOUR > 0) {
            newModel[k].USD.CLASS = 'green';
          } else {
            newModel[k].USD.CLASS = 'red';
          }

          // set animate flag
          if (oldModel) {
            let oldCurrency;
            oldModel.forEach(currency => {
              if (currency.NAME === k) {
                oldCurrency = currency;
              }
            });

            Object.keys(newModel[k].USD).map(j => {
              // console.log(newModel[k].USD[j], oldCurrency.USD[j]);
              if (Number(newModel[k].USD[j])) {
                // console.log(oldCurrency.USD[j] < newModel[k].USD[j], newModel[k].USD[j], oldCurrency.USD[j])

                // old is smaller
                if (newModel[k].USD[j] > oldCurrency.USD[j]) {
                  const flashValue = j + 'FLASH';
                  newModel[k][flashValue] = 'flash-green';
                  // console.log(newModel[k]);
                }

                // old is bigger
                if (newModel[k].USD[j] < oldCurrency.USD[j]) {
                  const flashValue = j + 'FLASH';
                  newModel[k][flashValue] = 'flash-red';
                  // console.log(newModel[k]);
                }

              }
            })
          }

          // return newModel[k];
      }
      this.marketModel = newModel;
    }
    console.log(this.marketModel);
  }

  ngOnInit() {
    this.cs.refresh();
  }

}

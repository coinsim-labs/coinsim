import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { CryptoCompareService } from '../../cryptocompare.service';}

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {

  private marketModel;

  constructor(private ccs: CryptoCompareService) {
    this.getMarketModel();
    setInterval(() => {
        this.getMarketModel()
      }, 6000);
    // this.http.get("../../../assets/tmp/market.json")
    //   .subscribe((success) => {
    //     let x = success.json().DISPLAY;
    //     this.marketModel = Object.keys(x).map(k => {
    //        x[k].NAME = k;
    //        return x[k];
    //     });
    //     console.log(success.json());
    //   });
  }

  getMarketModel() {
    this.ccs.multiCryptoPrice(
      'BTC,ETC,ETH,BCH,XRP,LTC,QTUM,IOT,XMR,DASH,ZEC,EOS,MONA,NEO,OMG,XLM,BTG,ADA,POWR,WTC',
      'USD', null, 'coinsim', null, null, true)
      .map(result => result)
      .subscribe(
        (Success) => {this.onMarketModelSuccess(Success)},
        (Error) => {console.log(Error); alert('Failed to get Currencies')}
      );
  }

  onMarketModelSuccess(Success : Object) {
    if (Success.hasOwnProperty('RAW')) {
      const newModel = Success.RAW;
      const oldModel = this.marketModel;
      this.marketModel = Object.keys(newModel).map(k => {
          //set name
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
            console.log(newModel[k], oldCurrency);

            Object.keys(newModel[k].USD).map(j => {
              console.log(newModel[k].USD[j], oldModel);
            })
          }

          return newModel[k];
      });
    }
  }

  ngOnInit() {

  }

}

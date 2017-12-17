import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { CryptoCompareService } from '../../cryptocompare.service';
import { CoinsimService } from '../../coinsim.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {

  private marketModel;
  private nameObject: Object;

  constructor(private ccs: CryptoCompareService, private cs: CoinsimService ) {
    this.cs.currencies().subscribe(
      (Success) => {
        const array = Success.json();
        const temp = {}
        array.forEach(element => {
          if (element.name !== 'US Dollar') {
            temp[element.sym] = element.name;
          }
        });
        this.nameObject = temp;

        this.getMarketModel();
        setInterval(() => {
          this.getMarketModel()
        }, 6000);
      },
      (Error) => alert("failed to connect to coinsim api")
    )
  }

  getMarketModel() {
    this.ccs.multiCryptoPrice(
      Object.keys(this.nameObject).join(','), 'USD',
      null, 'coinsim', null, null, true)
      .map(result => result)
      .subscribe(
        (Success) => {this.onMarketModelSuccess(Success)},
        (Error) => {console.log(Error); alert('Failed to get Currencies')}
      );
  }

  onMarketModelSuccess(Success: Object) {
    if (Success.hasOwnProperty('RAW')) {
      const newModel = Success.RAW;
      const oldModel = this.marketModel;
      this.marketModel = Object.keys(newModel).map(k => {
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
                  console.log(newModel[k]);
                }

                // old is bigger
                if (newModel[k].USD[j] < oldCurrency.USD[j]) {
                  const flashValue = j + 'FLASH';
                  newModel[k][flashValue] = 'flash-red';
                  console.log(newModel[k]);
                }

              }
            })
          }

          return newModel[k];
      });
    }
  }

  ngOnInit() {

  }

}

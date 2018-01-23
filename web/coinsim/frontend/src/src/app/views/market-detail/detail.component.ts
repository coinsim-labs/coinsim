import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CoinsimService } from '../../coinsim.service'
import { CryptoCompareService } from '../../cryptocompare.service'
import {Observable} from "rxjs/Observable";

@Component({
  templateUrl: 'detail.component.html',
  styleUrls: ['detail.component.scss']
})
export class DetailComponent implements OnInit {
  currency: string;
  currency_map: any;
  price: any;
  cryptoDescription: Observable<Object[]>

  constructor(private cs: CoinsimService, private ccs: CryptoCompareService, private route: ActivatedRoute) {
    this.route.params.subscribe(
        params => {
          this.currency = params['currency']
          this.ccs.multiCryptoPrice(this.currency, 'USD', null, null, null, null, true).subscribe(price => {
            this.price = price['DISPLAY'][this.currency]['USD'];
            console.log(this.price);
          })
        }
    );
  }

  ngOnInit() {
    this.cs.refresh();
    this.cs.currencyMap().subscribe(currencies => {
      this.currency_map = currencies;
      // let page = this.coingecko.parseCryptoDescription(this.currency_map['BTC'].name).subscribe(result => {
      //   console.log(result);
      //   debugger;
      // });
    })
    this.cryptoDescription = this.getCryptoDescription();
  }

  getCryptoDescription() {
    return this.cs.cryptoDescriptions().map(
      descriptions => {
        let filtered = descriptions.filter(
          description => {
            return description.currency === this.currency;
          });
        return filtered[0].text;
      });
  }

}

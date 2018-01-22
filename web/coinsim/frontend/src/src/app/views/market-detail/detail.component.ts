import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CoinsimService } from '../../coinsim.service'
import { CryptoCompareService } from '../../cryptocompare.service'
@Component({
  templateUrl: 'detail.component.html',
  styleUrls: ['detail.component.css']
})
export class DetailComponent implements OnInit {
  currency: string;
  currency_map: any;
  price: any;

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
    this.cs.currencyMap().subscribe(currencies => {
      this.currency_map = currencies
    })

    
  }

}

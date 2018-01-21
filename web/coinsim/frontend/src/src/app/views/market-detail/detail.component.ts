import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CoinsimService } from '../../coinsim.service'
@Component({
  templateUrl: 'detail.component.html',
  styleUrls: ['detail.component.css']
})
export class DetailComponent implements OnInit {
  currency: string;
  currency_map: any;

  constructor(private cs: CoinsimService, private route: ActivatedRoute) {
    this.route.params.subscribe(
        params => {
          this.currency = params['currency']

        }
    ); 
  }

  ngOnInit() {
    this.cs.currencyMap().subscribe(currencies => {
      this.currency_map = currencies
    })
  }

}

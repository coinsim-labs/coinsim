import { Component, OnInit } from '@angular/core';
import { CoinsimService } from '../../coinsim.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  currency_map: any;
  
  constructor(private coinsimService: CoinsimService,) { }

  ngOnInit() {
    this.coinsimService.currencyMap().subscribe((currencies) => {
      this.currency_map = currencies;
    });
  }

}

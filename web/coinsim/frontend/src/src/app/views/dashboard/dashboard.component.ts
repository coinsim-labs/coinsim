import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CoinsimService } from '../../coinsim.service';

@Component({
  templateUrl: 'dashboard.component.html',
  providers: [CoinsimService]
})
export class DashboardComponent implements OnInit{

  private username: string;
  currencies: any;

  constructor( private cs: CoinsimService ) {
    this.username = JSON.parse(localStorage.getItem('currentUser')).username;
   }

   ngOnInit() {
    this.cs.balances().subscribe(balances => {
      this.currencies = balances
      .map(balance => balance.currency)
      .filter(currency => currency != 'USD');

      console.log(this.currencies)
    });

    
}

}

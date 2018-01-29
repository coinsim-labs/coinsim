import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CoinsimService } from '../../coinsim.service';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
  providers: [CoinsimService]
})
export class DashboardComponent implements OnInit{

  private username: string;
  currencies: any;

  constructor( private cs: CoinsimService ) {
    let token = JSON.parse(localStorage.getItem('currentUser')).token;
    token = token.split('.');
    this.username = JSON.parse(atob(token[1])).username;
   }

   ngOnInit() {
    this.cs.refresh();

    this.cs.balances().subscribe(balances => {
      this.currencies = balances
      .map(balance => balance.currency)
      .filter(currency => currency !== 'USD');

      console.log ('currences........', this.currencies);
    });

    
}

}

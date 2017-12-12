import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CoinsimService } from '../../coinsim.service';

@Component({
  templateUrl: 'dashboard.component.html',
  providers: [CoinsimService]
})
export class DashboardComponent {

  private username : string;

  constructor( private cs: CoinsimService ) {
    this.username = JSON.parse(localStorage.getItem('currentUser')).username;
   }

}

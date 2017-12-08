import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CryptoService } from '../../crypto.service';

@Component({
  templateUrl: 'dashboard.component.html',
  providers: [CryptoService]
})
export class DashboardComponent {

  private username : string;

  constructor( private cs: CryptoService ) {
    this.username = JSON.parse(localStorage.getItem('currentUser')).username;
   }

}

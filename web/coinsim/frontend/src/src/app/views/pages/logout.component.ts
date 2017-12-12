import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CoinsimService } from '../../coinsim.service';

@Component({
  template: '<div>Bye</div>',
  providers: [CoinsimService]
})
export class LogoutComponent implements OnInit{

  constructor(private router: Router, private cs: CoinsimService) { }

  ngOnInit() {
    this.cs.logout();
    this.router.navigate(['/']);
  }

}

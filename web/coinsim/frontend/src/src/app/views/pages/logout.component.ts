import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CryptoService } from '../../crypto.service';

@Component({
  template: '<div>Bye</div>',
  providers: [CryptoService]
})
export class LogoutComponent implements OnInit{

  constructor(private router: Router, private cs: CryptoService) { }

  ngOnInit() {
    this.cs.logout();
    this.router.navigate(['/']);
  }

}

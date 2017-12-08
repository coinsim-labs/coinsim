import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CryptoService } from '../../crypto.service';

@Component({
  templateUrl: 'login.component.html',
  providers: [CryptoService]
})
export class LoginComponent {

  private username : string;
  private password : string;

  constructor(private router: Router, private cs: CryptoService) { }

  private onUsernameChange(string) {
    this.username = string;
  }

  private onPasswordChanges(string) {
    this.password = string;
  }


  private checkLogin() {
    this.cs.login(this.username, this.password);
  }

  private navToRegister() {
    this.router.navigateByUrl('/pages/register');
  }

}

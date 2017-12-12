import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CoinsimService } from '../../coinsim.service';

@Component({
  templateUrl: 'login.component.html',
  providers: [CoinsimService]
})
export class LoginComponent {

  private username : string;
  private password : string;

  constructor(private router: Router, private cs: CoinsimService) { }

  private onUsernameChange(string) {
    this.username = string;
  }

  private onPasswordChange(string) {
    this.password = string;
  }


  private checkLogin() {
    this.cs.login(this.username, this.password).subscribe(result => {
      if(!result) {
        console.log('result', result);
      }
    });
    return false;
  }

  private navToRegister() {
    this.router.navigateByUrl('/pages/register');
  }

}

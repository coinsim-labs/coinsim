import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CoinsimService } from '../../coinsim.service';

@Component({
  templateUrl: 'login.component.html',
  providers: [CoinsimService]
})
export class LoginComponent {

  private username: string;
  private password: string;

  constructor(private router: Router, private cs: CoinsimService) { }

  private onUsernameChange(string) {
    this.username = string;
  }

  private onPasswordChange(string) {
    this.password = string;
  }

  private failedLogin(): void {
    // console.log('failed login');
    const usernameInput = <HTMLInputElement>document.getElementById('username'),
          passwordInput = <HTMLInputElement>document.getElementById('password'),
          badRequestHint = document.getElementById('badRequestHint')

    passwordInput.value = '';
    badRequestHint.style.display = 'block';

    usernameInput.blur();
    passwordInput.blur();
  }


  private checkLogin() {
    return this.cs.login(this.username, this.password)
      .map(result => result)
      .subscribe(
        data => document.getElementById('badRequestHint').style.display = 'none',
        error => this.failedLogin()
      );
  }

  private navToRegister() {
    this.router.navigateByUrl('/pages/register');
  }

}

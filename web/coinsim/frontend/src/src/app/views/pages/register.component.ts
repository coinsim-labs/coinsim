import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { CoinsimService } from '../../coinsim.service';

@Component({
  templateUrl: 'register.component.html',
  providers: [CoinsimService]
})
export class RegisterComponent {

  private form;

  constructor(private router: Router, private cs: CoinsimService) {
    this.form = {
      username  : '',
      email     : '',
      password1 : '',
      password2 : ''
    }
  }

  private onUsernameChange(string): void {
    this.form.username = string;
  }

  private onEmailChange(string): void {
    this.form.email = string;
  }

  private onPassword1Change(string): void {
    this.form.password1 = string;
  }

  private onPassword2Change(string): void {
    this.form.password2 = string;
    this.validatePassword();
  }

  private navToLogin(): void {
    this.router.navigateByUrl('/pages/login');
  }

  private validatePassword() {
    const password = <HTMLInputElement>document.getElementById('password');
    if (this.form.password1 !== this.form.password2) {
      password.setCustomValidity('Passwords are not matching');
    } else {
      password.setCustomValidity('');
    }
  }



  private badRegisterRequest(error): void {
    console.log('error', error);
    if (error.status === 400) {
      alert('username already taken');
    } else {
      alert('Bad request');
    }
  }


  private checkRegister() {
    const username = this.form.username,
          email = this.form.email,
          password = this.form.password1;

    return this.cs.register(username, email, password)
      .map(data => data)
      .subscribe(
        data => console.log(data),
        error => this.badRegisterRequest(error)
      );
  }
}

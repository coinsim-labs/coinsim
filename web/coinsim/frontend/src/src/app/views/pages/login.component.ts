import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  constructor(private router: Router) { }

  private checkLogin() {
    //alert("works");
    this.router.navigateByUrl('/dashboard');
  }

  private navToRegister() {
    this.router.navigateByUrl('/pages/register');
  }

}

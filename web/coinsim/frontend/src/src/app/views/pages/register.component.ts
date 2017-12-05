import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  
  private usernameValue : String;
  
  constructor(private router: Router) { 
    this.usernameValue = "";
  }

  private onUserNameChange(string) {
    this.usernameValue = string;
  }

  private navToLogin() {
    this.router.navigateByUrl('/pages/login');
  }

}

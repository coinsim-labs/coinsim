import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { CryptoService } from '../../crypto.service';

@Component({
  templateUrl: 'register.component.html',
  providers: [CryptoService]
})
export class RegisterComponent {
  
  private form;
  
  constructor(private router: Router, private cs: CryptoService) {
    this.form = {
      username  : "",
      email     : "",
      password1 : "",
      password2 : ""
    }
  }

  private isValidEmail():boolean {
    let pattern = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return (pattern.test(this.form.email)); 
  }

  private onUsernameChange(string):void {
    this.form.username = string;
  }

  private onEmailChange(string):void {
    this.form.email = string;
  }
  
  private onPasswordChange1(string):void {
    this.form.password1 = string;
  }

  private onPassword2Change(string):void {
    this.form.password2 = string;
  }

  private navToLogin():void {
    this.router.navigateByUrl('/pages/login');
  }


  private checkRegister():void {
    let validEmail = this.isValidEmail(),
        un = this.form.username,
        em = this.form.email,
        pw = this.form.password;

        this.cs.register(un,em,pw).subscribe(result => {
          if (result === true) {
              this.router.navigate(['/dashboard']);
          } else {
              console.log('Username fjdsklfj');
          }
      });
    
    if(validEmail) {

    }
  }

}

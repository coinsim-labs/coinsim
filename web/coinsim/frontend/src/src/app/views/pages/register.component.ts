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
      username  : "",
      email     : "",
      password1 : "",
      password2 : ""
    }
  }

  private onUsernameChange(string):void {
    this.form.username = string;
  }

  private onEmailChange(string):void {
    this.form.email = string;
  }
  
  private onPassword1Change(string):void {
    this.form.password1 = string;
  }

  private onPassword2Change(string):void {
    this.form.password2 = string;
  }

  private navToLogin():void {
    this.router.navigateByUrl('/pages/login');
  }


  private checkRegister():void {
    let un = this.form.username,
        em = this.form.email,
        pw = this.form.password1,
        pwcheck = this.form.password2;

        if(pw !== pwcheck) {
          alert("Password not the same");
          return;
        }

        this.cs.register(un,em,pw).subscribe(result => {
          if (result === true) {
              this.router.navigate(['/dashboard']);
          } else {
              //TODO: stuff
          }
      });
  }

}

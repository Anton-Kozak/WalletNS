import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import * as Toast from 'nativescript-toast';
import { isAndroid, isIOS } from "tns-core-modules/platform";
@Component({
  selector: 'ns-registration-login',
  templateUrl: './registration-login.component.html',
  styleUrls: ['./registration-login.component.scss']
})
export class RegistrationLoginComponent implements OnInit {


  signUpForm: FormGroup;
  signInForm: FormGroup;
  isSignUp = true;
  invites: number = 0;

  constructor(private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'usernameUp': new FormControl('', { updateOn: 'change', validators: [Validators.required, Validators.minLength(4), Validators.maxLength(10), Validators.pattern('([0-9].*[a-zA-Z])|([a-zA-Z].*[0-9])')] }),
      'userpassUp': new FormControl('', { updateOn: 'change', validators: [Validators.required, Validators.minLength(4), Validators.maxLength(8), Validators.pattern('([0-9].*[a-zA-Z])|([a-zA-Z].*[0-9])')] }),
      'role': new FormControl('', { updateOn: 'blur', validators: Validators.required })
    });
    this.signInForm = new FormGroup({
      'usernameIn': new FormControl('', { updateOn: 'change', validators: [Validators.required, Validators.minLength(4), Validators.maxLength(10)] }),
      'userpassIn': new FormControl('', { updateOn: 'change', validators: [Validators.required, Validators.minLength(4), Validators.maxLength(8)] })
    });
    // this.authService.isLoggedIn.subscribe(res => {
    //   this.isSignedIn = res;
    // })
  }

  onSignUp() {
    const username = this.signUpForm.value['usernameUp'];
    const password = this.signUpForm.value['userpassUp'];
    const role = 'Adult';
    this.authService.register(username, password, role).subscribe(() => {
      var toast = Toast.makeText("Successfully created a new user");
      toast.show();
      this.signUpForm.reset();
      this.signInForm.reset();
      this.isSignUp = false;
    }, error => {
      console.log(error.error);
      var toast = Toast.makeText(error.error);
      toast.show();
    })
  }

  onSignIn() {
    if (this.signInForm.valid) {
      const username = this.signInForm.value['usernameIn'];
      const password = this.signInForm.value['userpassIn'];
      console.log(username, password);
      this.authService.login(username, password).subscribe((data: any) => {
        if (isAndroid) {
          var toast = Toast.makeText("Welcome: " + data.user['userName']);
          toast.show();
          console.log("Welcome: " + data.user['userName'])
        }
        if (this.hasWallet()) {
          console.log('Has wallet');
          // go to wallet
          this.router.navigate(['/wallet/home']);
        }
        else {
          console.log('need to create wallet');
          this.router.navigate(['/no-wallet']);
          //go to wallet creation
        }
      }, error => {
        if (isAndroid) {
          var toast = Toast.makeText(error.error);
          toast.show();
        }
        console.log('Custom error, ', error.error);
      })

    }
    else
      console.log('Form is invalid');
  }

  logout() {
    this.authService.logout();
  }

  switchCard() {
    this.isSignUp = !this.isSignUp;
    this.signUpForm.reset();
    this.signInForm.reset();
  }

  hasWallet() {
    if (this.authService.getToken() !== null && this.authService.getToken().hasWallet === "true")
      return true;
    return false;
  }
}

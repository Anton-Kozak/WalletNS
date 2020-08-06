import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import {
  getString,
  hasKey,
} from 'tns-core-modules/application-settings';
import { RouterExtensions } from "@nativescript/angular/router";
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: RouterExtensions) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('Auth guard activated');
    //
    let hasToken = hasKey('token');
    var token;
    if (hasToken) {
      token = this.authService.getToken();
      // console.log(currentToken);
      // console.log('Current decoded token expiration', new Date(currentToken.exp).getHours());
      // console.log('Current time', Date.now());
      // expired
      if (token.exp >= Date.now()) {
        console.log('Token has expired. Initiating auto login.')
        if (hasKey("username") && hasKey('password')) {
          console.log('Token before auto login', getString('token'));
          this.authService.login(getString("username"), getString('password')).subscribe(() => {
            console.log('Token after auto login', getString('token'));
            this.navigation(token);
          });
        }
        return true;
      }
      else {
        this.navigation(token);
      }
    }
    return true;
  }

  navigation(token: any) {
    if (token.hasWallet === 'true') {
      console.log('go to wallet section');
      //go to wallet section
      this.router.navigate(['wallet/home']);
    }
    else {
      console.log('go to wallet creation section');
      // console.log('Username', getString('username'));
      // console.log('Password', getString('password'));
      this.router.navigate(['no-wallet']);
    }
    return false;
  }

}

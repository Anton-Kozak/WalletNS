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
      const expDate = new Date(token.exp * 1000);
      console.log('Current token expiration: ', expDate);
      const currDate = new Date(Date.now());
      console.log('Current time', currDate);
      // expired
      if (expDate <= currDate) {
        console.log('Token has expired. Initiating auto login.')
        if (hasKey("username") && hasKey('password')) {
          this.authService.login(getString("username"), getString('password')).subscribe(() => {
            this.navigation(token);
            console.log('token after auto login', token.exp)
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
      this.authService.isLoggedIn.next(true);
      this.router.navigate(['/home']);
    }
    else {
      console.log('go to wallet creation section');
      this.authService.isLoggedIn.next(false);
      this.router.navigate(['/no-wallet']);
    }
    return false;
  }

}

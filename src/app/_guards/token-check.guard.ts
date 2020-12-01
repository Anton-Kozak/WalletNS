import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { Observable } from 'rxjs';
import {
  getString,
  hasKey,
} from 'tns-core-modules/application-settings';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenCheckGuard implements CanActivateChild {
  constructor(private authService: AuthService, private router: RouterExtensions) { }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('This guard should work every single call of wallet elements to prevent from token expiration. In case token has expired, auto login should fire and update the token.');
    let hasToken = hasKey('token');
    var token;
    if (hasToken) {
      token = this.authService.getToken();
      const expDate = new Date(token.exp * 1000);
      console.log('Current token expiration: ', expDate);
      const currDate = new Date(Date.now());
      console.log('Current time', currDate);
      //если токен кончился, заходим для автологина
      if (expDate <= currDate) {
        console.log('Token has expired. Initiating auto login.')
        if (hasKey("username") && hasKey('password')) {
          //если пароль есть, то идем на автологин
          this.authService.login(getString("username"), getString('password')).subscribe(() => {
            this.navigation(token);
            console.log('token after auto login', token.exp);
            return true;
          });
        }
        //если пароля нет, идем на регистрацию
        else {
          console.log('go to registration as there is no password or login found');
          this.router.navigate(['registration']);
          return false;
        }
      } //токен не кончился, просто идем куда нажали - чаще всего будем заходить сюда 
      else {
        if (!this.authService.isLoggedIn.value)
          this.authService.isLoggedIn.next(true);
        console.log('token is present and not expired. should be redirected to: ', childRoute.url);
        return true;
      }
    }
    else {
      console.log('go to registration because no token was found');
      this.router.navigate(['registration']);
      return false;
    }
  }


  navigation(token: any) {
    if (token.hasWallet === 'true') {
      console.log('go to wallet section');
      this.authService.isLoggedIn.next(true);
      this.router.navigate(['wallet/home']);
    }
    else {
      console.log('go to wallet creation section');
      this.authService.isLoggedIn.next(false);
      this.router.navigate(['wallet/no-wallet']);
    }
    return false;
  }

}


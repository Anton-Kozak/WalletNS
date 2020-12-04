import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { sitePath } from './environment';
import {
  setString,
  getString,
  hasKey,
  remove
} from 'tns-core-modules/application-settings';
import * as jwt_decode from "jwt-decode";
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  decodedToken: any;
  baseUrl: string = sitePath + 'auth/';


  isLoggedIn = new BehaviorSubject<boolean>(false);
  //hasWallet = new BehaviorSubject<boolean>(this.checkUserWallet());
  constructor(private http: HttpClient, private router: Router) { }

  register(username: string, userpass: string, role: string) {
    return this.http.post(this.baseUrl + 'register', { username: username, password: userpass, role: role });
  }

  login(username: string, userpass: string) {
    console.log('try logging');
    let date = new Date().toUTCString();
    //console.log(username, userpass, date);
    //return this.http.post(this.baseUrl + 'login', { username: username, password: userpass, date: date });
    return this.http.post(this.baseUrl + 'login', { username: username, password: userpass, date: date }).pipe(map((response: any) => {
      //console.log(response);
      if (response) {
        setString('username', username);
        setString('password', userpass);
        setString('token', response['token']);
        this.isLoggedIn.next(true);
        // console.log('Decoded token: ', this.getToken());
        // console.log('Raw token', response['token']);
      }
      return response;
    }));
  }

  logout() {
    remove('username');
    remove('password');
    remove('token');
    //2console.log('Decoded token: ', this.getToken());
    this.isLoggedIn.next(false);
    this.router.navigate(['registration']);
  }

  getToken() {
    const token = getString('token');
    if (token !== null) {
      this.decodedToken = jwt_decode(token);
      return this.decodedToken;
    }
    return null;
  }
  roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles = this.getToken().role as Array<string>;
    console.log('roles', userRoles)
    allowedRoles.forEach(element => {
      if (userRoles.includes(element)) {
        isMatch = true;
        return;
      }
    })
    return isMatch;
  }
}

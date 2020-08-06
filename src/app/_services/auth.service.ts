import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { sitePath } from './environment';
import {
  setString,
  getString,
  hasKey,
  remove
} from 'tns-core-modules/application-settings';
import * as jwt_decode from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  decodedToken: any;
  baseUrl: string = sitePath + 'auth/';

  // isLoggedIn = new BehaviorSubject<boolean>(!this.jwtHelper.isTokenExpired(localStorage.getItem('token')));
  //hasWallet = new BehaviorSubject<boolean>(this.checkUserWallet());
  constructor(private http: HttpClient, private router: Router) { }

  register(username: string, userpass: string, role: string) {
    return this.http.post(this.baseUrl + 'register', { username: username, password: userpass, role: role });
  }

  login(username: string, userpass: string) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this.http.post(this.baseUrl + 'login', { username: username, password: userpass }, { headers: headers }).pipe(map((response: any) => {
      if (response) {
        setString('username', username);
        setString('password', userpass);
        setString('token', response['token']);
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
    this.router.navigate(['']);
  }

  getToken() {
    const token = getString('token');
    console.log('This is current token:', token);
    if (token !== null) {
      this.decodedToken = jwt_decode(token);
      return this.decodedToken;
    }
    return null;
  }

  checkLogin() {
    // this.isLoggedIn.next(!this.jwtHelper.isTokenExpired(localStorage.getItem('token')));
  }

  checkUserWallet() {
    // const token = localStorage.getItem('token');
    // if (token !== null) {
    //   if (this.getToken().hasWallet === "true")
    //     return true;
    //   return false;
    // }
    // return false;
  }

  roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles = this.decodedToken.role as Array<string>;
    allowedRoles.forEach(element => {
      if (userRoles.includes(element)) {
        isMatch = true;
        return;
      }
    })
    return isMatch;
  }
}

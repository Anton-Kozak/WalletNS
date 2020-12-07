import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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



  headers = new BehaviorSubject<HttpHeaders>(null);

  decodedToken: any;
  baseUrl: string = sitePath + 'auth/';
  isLoggedIn = new BehaviorSubject<boolean>(false);
  isAdmin = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router) { }

  updateHeaders() {
    this.headers.next(new HttpHeaders({
      "Authorization": "Bearer " + getString('token')
    }));
  }


  register(username: string, userpass: string, role: string) {
    return this.http.post(this.baseUrl + 'register', { username: username, password: userpass, role: role });
  }

  login(username: string, userpass: string) {
    console.log('try logging');
    let date = new Date().toUTCString();
    return this.http.post(this.baseUrl + 'login', { username: username, password: userpass, date: date }).pipe(map((response: any) => {
      if (response) {
        setString('username', username);
        setString('password', userpass);
        setString('token', response['token']);
        this.isLoggedIn.next(true);
        this.headers.next(new HttpHeaders({
          "Authorization": "Bearer " + getString('token')
        }));
      }
      return response;
    }));
  }

  logout() {
    remove('username');
    remove('password');
    remove('token');
    this.isLoggedIn.next(false);
    this.router.navigate(['initial/registration']);
  }

  getToken() {
    const token = getString('token');
    if (token !== null && token !== undefined) {
      this.decodedToken = jwt_decode(token);
      return this.decodedToken;
    }
    return null;
  }
  roleMatch(allowedRoles) {
    if (getString('token') !== undefined) {
      const userRoles = this.getToken().role as Array<string>;
      allowedRoles.forEach(element => {
        if (userRoles.includes(element)) {
          this.isAdmin.next(true);
          return;
        }
      })
    }
  }
}

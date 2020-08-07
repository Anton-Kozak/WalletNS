import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { sitePath } from './environment';
import { AuthService } from './auth.service';
import { getString } from 'tns-core-modules/application-settings';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  baseUrl: string = sitePath + "request/";

  headers = new HttpHeaders({
    "Authorization": "Bearer " + getString('token')
  });


  constructor(private http: HttpClient, private authService: AuthService) { }


  updateHeaders() {
    this.headers = new HttpHeaders({
      "Authorization": "Bearer " + getString('token')
    });
  }

  createRequestForAccess(email: string) {
    return this.http.post(this.baseUrl + this.authService.getToken().nameid + '/request/' + email, {}, { responseType: 'text', headers: this.headers });
  }

  getRequests(userId: string) {
    return this.http.get(this.baseUrl + userId + '/getRequests', { headers: this.headers });
  }

  acceptRequest(email: string, userId: string) {
    return this.http.post(this.baseUrl + userId + '/acceptRequest/' + email, {}, { responseType: 'text', headers: this.headers });
  }

  declineRequest(email: string) {
    return this.http.post(this.baseUrl + this.authService.getToken().nameid + '/decline/' + email, {}, { responseType: 'text', headers: this.headers });
  }

  test() {
    return this.http.post(this.baseUrl + this.authService.getToken().nameid + '/test', {}, { responseType: 'text', headers: this.headers });
  }

}

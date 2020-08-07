import { Injectable } from '@angular/core';
import { sitePath } from './environment';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getString } from 'tns-core-modules/application-settings';

@Injectable({
  providedIn: 'root'
})
export class InviteService {

  baseUrl: string = sitePath + "invite/"
  headers = new HttpHeaders({
    "Authorization": "Bearer " + getString('token')
  });


  updateHeaders() {
    this.headers = new HttpHeaders({
      "Authorization": "Bearer " + getString('token')
    });
  }
  constructor(private http: HttpClient, private authService: AuthService) { }


  checkInvites() {
    return this.http.get(this.baseUrl + this.authService.getToken().nameid + '/getInvites', { headers: this.headers });
  }

  createInvite(email: string) {
    return this.http.post(this.baseUrl + this.authService.getToken().nameid + '/invite/' + email, {}, { responseType: 'text', headers: this.headers });
  }

  accept(walletId: number) {
    return this.http.post(this.baseUrl + this.authService.getToken().nameid + '/accept/' + walletId, {}, { responseType: 'text', headers: this.headers });
  }


  decline(walletId: number) {
    return this.http.post(this.baseUrl + this.authService.getToken().nameid + '/decline/' + walletId, {}, { responseType: 'text', headers: this.headers });
  }
}

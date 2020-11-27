import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { sitePath } from './environment';
import { AuthService } from './auth.service';
import { getString } from 'tns-core-modules/application-settings';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  headers = new HttpHeaders({
    "Authorization": "Bearer " + getString('token')
  });


  constructor(private http: HttpClient, private authService: AuthService) { }


  updateHeaders() {
    this.headers = new HttpHeaders({
      "Authorization": "Bearer " + getString('token')
    });
  }

  baseUrl: string = sitePath + 'notification/';
  //value: boolean;
  getNotifications() {
    return this.http.get(this.baseUrl + this.authService.getToken().nameid + '/getNotifications', { headers: this.headers });
  }


  deleteNotifications() {
    return this.http.delete(this.baseUrl + this.authService.getToken().nameid + '/deleteNotification', { headers: this.headers });
  }

}

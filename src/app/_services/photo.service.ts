import { Injectable } from '@angular/core';
import { sitePath } from './environment';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getString } from 'tns-core-modules/application-settings';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  headers = new HttpHeaders({
    "Authorization": "Bearer " + getString('token')
  });

  baseUrl: string = sitePath + "photo/";
  constructor(private http: HttpClient, private authService: AuthService) { }

  getPhoto() {
    return this.http.get(this.baseUrl + this.authService.getToken().nameid, { headers: this.headers });
  }

  addPhoto(file: any) {
   // const uploadData = new FormData();
    //uploadData.append('File', file);
    return this.http.post(this.baseUrl + this.authService.getToken().nameid + '/mobilePhoto', file, { headers: this.headers });
  }

  deletePhoto() {
    return this.http.delete(this.baseUrl + this.authService.getToken().nameid, { headers: this.headers });
  }

  getAllUserPhotos() {
    return this.http.get(this.baseUrl + this.authService.getToken().nameid + '/getUserPhotos', { headers: this.headers })
  }
}

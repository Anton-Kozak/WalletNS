import { Injectable } from '@angular/core';
import { Wallet } from '../_models/wallet';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { sitePath } from './environment';
import { AuthService } from './auth.service';
import { CategoryData } from '../_models/categoryData';
import { getString } from 'tns-core-modules/application-settings';
import { UserForProfileEdit } from '../_models/user-for-profile-edit';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }
  baseUrl: string = sitePath + "wallet/";

  walletCategories: CategoryData[] = [];

  currentWallet: Wallet;

  currentCategories = new BehaviorSubject<CategoryData[]>([]);

  headers = new HttpHeaders({
    "Authorization": "Bearer " + getString('token')
  });


  updateHeaders() {
    this.headers = new HttpHeaders({
      "Authorization": "Bearer " + getString('token')
    });
  }

  getAllCategories() {
    return this.http.get(sitePath + "expense/" + this.authService.getToken().nameid + '/getAllCategories');
  }

  createNewWallet(walletToCreate: Wallet) {
    return this.http.post(this.baseUrl + this.authService.getToken().nameid + '/createwallet', walletToCreate, { headers: this.headers });
  }

  getCurrentWallet() {
    this.http.get(this.baseUrl + this.authService.getToken().nameid + '/getCurrentWallet', { headers: this.headers }).subscribe((currentWallet: Wallet) => {
      this.currentWallet = currentWallet;
    });
  }


  getWalletsCategories() {
    this.http.get<CategoryData[]>(this.baseUrl + this.authService.getToken().nameid + '/getWalletCategories', { headers: this.headers }).subscribe((categories: CategoryData[]) => {
      this.currentCategories.next(categories);
    });
  }

  getProfileData() {
    return this.http.get(this.baseUrl + this.authService.getToken().nameid + '/profile', { headers: this.headers });
  }

  updateUserProfile(editUser: UserForProfileEdit) {
    return this.http.post(this.baseUrl + this.authService.getToken().nameid + '/updateProfile', editUser, { responseType: 'text', headers: this.headers });
  }


  editWallet(wallet: Wallet) {
    return this.http.put(this.baseUrl + this.authService.getToken().nameid + '/editWallet', wallet, { responseType: 'text', headers: this.headers });
  }


  addCategoriesToWallet(categories: number[]) {
    return this.http.post(this.baseUrl + this.authService.getToken().nameid + '/addCategories', categories, { headers: this.headers });
  }

}

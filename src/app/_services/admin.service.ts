import { Injectable } from '@angular/core';
import { sitePath } from './environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ExpenseForTable } from '../_models/expense-for-table';
import { getString } from 'tns-core-modules/application-settings';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl: string = sitePath + 'admin/';

  headers = new HttpHeaders({
    "Authorization": "Bearer " + getString('token')
  });


  constructor(private http: HttpClient, private authService: AuthService) { }


  updateHeaders() {
    this.headers = new HttpHeaders({
      "Authorization": "Bearer " + getString('token')
    });
  }

  getUsers() {
    return this.http.get(this.baseUrl + this.authService.getToken().nameid + '/getUsers', { headers: this.headers });
  }

  removeUser(userId: string) {
    return this.http.post(this.baseUrl + this.authService.getToken().nameid + '/removeUser/' + userId, {}, { responseType: 'text', headers: this.headers });
  }

  getAllExpenses() {
    return this.http.get(this.baseUrl + this.authService.getToken().nameid + '/getExpensesData', { headers: this.headers });
  }

  onExpenseDelete(id: number) {
    return this.http.delete(this.baseUrl + this.authService.getToken().nameid + '/expenseDelete/' + id, { responseType: 'text', headers: this.headers });
  }

  onExpenseEdit(expenseToEdit: ExpenseForTable) {
    return this.http.put(this.baseUrl + this.authService.getToken().nameid + '/expenseEdit/' + expenseToEdit.id, expenseToEdit, { headers: this.headers });
  }


}

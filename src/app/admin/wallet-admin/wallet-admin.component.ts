import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ExpenseForAdminTable } from '../../_models/expense-for-admin-table';
import { UserForAdmin } from '../../_models/user-for-admin';
import { AdminService } from '../../_services/admin.service';
import { ModalDialogService } from '@nativescript/angular/modal-dialog';
import { DataService } from '../../_services/data.service';
import { CreateInviteComponent } from '../create-invite/create-invite.component';
@Component({
  selector: 'ns-wallet-admin',
  templateUrl: './wallet-admin.component.html',
  styleUrls: ['./wallet-admin.component.scss']
})
export class WalletAdminComponent implements OnInit {

  constructor(private admService: AdminService,
    private adminService: AdminService,
    private modalDialog: ModalDialogService,
    private vcRef: ViewContainerRef,
    private dataService: DataService) { }
  expenses: ExpenseForAdminTable[] = [];
  users: UserForAdmin[] = [];



  ngOnInit(): void {
    this.admService.getAllExpenses().subscribe((expenses: ExpenseForAdminTable[]) => {
      this.expenses = expenses;
      console.log(this.expenses);
    })

    this.admService.getUsers().subscribe((usersForAdmin: UserForAdmin[]) => {
      this.users = usersForAdmin;
    });

  }

  removeUser(userId: string, rowIndex: number) {
    this.admService.removeUser(userId).subscribe(response => {
      //this.alertify.success(response);
      var el: any = (document.getElementById(rowIndex.toString())) as HTMLTableElement;
      el.remove(rowIndex);
    }, error => {
      //this.alertify.error(error.error);
    });
  }

  addNewUser() {
    this.modalDialog
      .showModal(CreateInviteComponent, {
        fullscreen: true,
        viewContainerRef: this.dataService.getRootVCRef()
          ? this.dataService.getRootVCRef()
          : this.vcRef,
      })
  }



  expenseDelete(id: number, rowIndex: number) {
    this.adminService.onExpenseDelete(id).subscribe((response: any) => {
      // this.alertify.success(response);
      this.expenses.splice(rowIndex, 1);
      this.expenses = this.expenses;
    }, error => {
      //this.alertify.error(error.error);
    });
  }

  addUserFromRequest($event) {
    this.admService.getUsers().subscribe((usersForAdmin: UserForAdmin[]) => {
      this.users = usersForAdmin;
    });
  }

}

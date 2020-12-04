import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ExpenseForAdminTable } from '../../_models/expense-for-admin-table';
import { UserForAdmin } from '../../_models/user-for-admin';
import { AdminService } from '../../_services/admin.service';
import { ModalDialogService } from '@nativescript/angular/modal-dialog';
import { DataService } from '../../_services/data.service';
import { CreateInviteComponent } from '../create-invite/create-invite.component';
import { ModalExpenseComponent } from '../../expenses/modal-expense/modal-expense.component';
import * as Toast from 'nativescript-toast';
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
  isLoading = false;



  ngOnInit(): void {
    this.adminService.updateHeaders();
    this.admService.getAllExpenses().subscribe((expenses: ExpenseForAdminTable[]) => {
      this.isLoading = true;
      this.expenses = expenses;
      this.admService.getUsers().subscribe((usersForAdmin: UserForAdmin[]) => {
        this.users = usersForAdmin;
        this.isLoading = false;
      });
    })
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


  addUserFromRequest($event) {
    this.admService.getUsers().subscribe((usersForAdmin: UserForAdmin[]) => {
      this.users = usersForAdmin;
    });
  }

  onExpenseTap(expense: ExpenseForAdminTable, rowIndex: number) {
    let expenseAdmin = { expense: expense, isAdmin: true };
    this.modalDialog
      .showModal(ModalExpenseComponent, {
        fullscreen: true,
        viewContainerRef: this.dataService.getRootVCRef()
          ? this.dataService.getRootVCRef()
          : this.vcRef,
        context: expenseAdmin
      }).then((result: { status: string, expense: ExpenseForAdminTable }) => {
        if (result.status === 'edit') {
          console.log('edit');
          this.expenses[rowIndex].expenseTitle = result.expense['expenseTitle'];
          this.expenses[rowIndex].expenseDescription = result.expense['expenseDescription'];
          this.expenses[rowIndex].moneySpent = result.expense['moneySpent'];
          this.expenses[rowIndex].category = result.expense['category'];
          this.expenses[rowIndex].creationDate = result.expense['creationDate'];
          this.expenses[rowIndex].userName = result.expense['userName'];
        }
        else if (result.status === 'delete') {
          this.adminService.onExpenseDelete(expense.id).subscribe((response: any) => {
            var toast = Toast.makeText(response);
            toast.show();
            this.expenses.splice(rowIndex, 1);
          }, error => {
            var toast = Toast.makeText(error.error);
            toast.show();
          });

        }
      })
  }
}

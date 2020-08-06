import { Component, OnInit } from '@angular/core';
import { ExpenseForAdminTable } from '../_models/expense-for-admin-table';
import { UserForAdmin } from '../_models/user-for-admin';
import { AdminService } from '../_services/admin.service';
@Component({
  selector: 'ns-wallet-admin',
  templateUrl: './wallet-admin.component.html',
  styleUrls: ['./wallet-admin.component.scss']
})
export class WalletAdminComponent implements OnInit {

  constructor(private admService: AdminService,
    private adminService: AdminService) { }
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

  sendInvitation() {
    // const dialogRef = this.dialog.open(CreateInviteComponent);
    // dialogRef.afterClosed().subscribe(result => {
    // });
  }

  openDialog(id: number, rowIndex: number): void {
    // var exp = this.expenses.data.find(x => x.id === id);
    // exp.isAdmin = true;
    // const dialogRef = this.dialog.open(EditExpenseModalComponent, {
    //   width: '550px',
    //   data: exp
    // });

    // dialogRef.afterClosed().subscribe(result => {     
    //   if (result !== undefined && result !== null) {
    //     this.expenses.data[rowIndex].expenseTitle = result['expenseTitle'];
    //     this.expenses.data[rowIndex].expenseDescription = result['expenseDescription'];
    //     this.expenses.data[rowIndex].moneySpent = result['moneySpent'];
    //     this.expenses.data[rowIndex].creationDate = result['creationDate'];
    //   }
    // });
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

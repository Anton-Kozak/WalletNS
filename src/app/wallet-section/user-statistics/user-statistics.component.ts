import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../_services/expense.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WalletService } from '../../_services/wallet.service';
import { AuthService } from '../../_services/auth.service';
import { ExpenseForTable } from '../../_models/expense-for-table';
import { ExpenseList } from '../../_models/expense-list';
import { LastMonthStat } from '../../_models/lastMonthStat';
import { CategoryData } from '../../_models/categoryData';

@Component({
  selector: 'ns-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.scss']
})
export class UserStatisticsComponent implements OnInit {

  constructor(private expService: ExpenseService,
    private route: ActivatedRoute,
    private walletService: WalletService,
    private authService: AuthService,
    private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }


  columnsForExpenses: string[] = ['expenseTitle', 'category', 'moneySpent', 'expenseDescription', 'creationDate', 'actions'];
  expenses: ExpenseForTable[] = [];

  isLoading: boolean;
  spentAll: number;
  avgDailyExpenses: number = 0;
  amountOfMoneySpent: number = 0;
  barExpenses: ExpenseList;
  currentMonthDataToCompare: ExpenseList;
  lastMonthDataToCompare: ExpenseList;
  mostSpentCategory: string;
  mostUsedCategory: string;
  lastSixMonths: LastMonthStat[];
  categories: CategoryData[] = [];
  isThisUser: boolean;
  private id;
  ngOnInit(): void {
    this.expService.updateHeaders();
    this.isThisUser = false;
    let userId = this.authService.decodedToken.nameid;
    this.id = this.route.snapshot.params['id'];
    if (userId === this.id)
      this.isThisUser = true;
    if (this.walletService.currentCategories.length === 0) {
      this.walletService.getWalletsCategories().subscribe((categories: CategoryData[]) => {
        this.walletService.currentCategories = categories;
        this.categories = this.walletService.currentCategories;
      });
    } else
      this.categories = this.walletService.currentCategories;


    this.isLoading = true;
    this.expService.getUserStatistics(this.id).subscribe(response => {
      this.expService.getUserExpenses(this.id).subscribe((expensesRecieved: ExpenseForTable[]) => {
        this.expenses = expensesRecieved;
      })
      if (response['amountOfMoneySpent'] != 0) {
        this.avgDailyExpenses = response['averageDailyExpense'];
        this.currentMonthDataToCompare = response['barCompareExpensesWithLastMonth']['currentMonthData'];
        this.lastMonthDataToCompare = response['barCompareExpensesWithLastMonth']['lastMonthData'];
        this.barExpenses = response['barExpenses'];
        this.lastSixMonths = response['lastSixMonths'];
        this.mostUsedCategory = response['mostUsedCategory'];
        this.mostSpentCategory = response['mostSpentCategory'];
        this.amountOfMoneySpent = response['amountOfMoneySpent'];
      }
      this.isLoading = false;
    })
  }

  expenseDelete(id: number, rowIndex: number) {
    this.expService.onExpenseDelete(id).subscribe((response: any) => {
      // this.expenses.data.splice(rowIndex, 1);
      // this.expenses.data = this.expenses.data;
    }, error => {
    });
  }

  openDialog(id: number, rowIndex: number): void {
    // var exp = this.expenses.data.find(x => x.id === id);
    // const dialogRef = this.dialog.open(EditExpenseModalComponent, {
    //   width: '550px',
    //   data: exp
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result != null) {
    //     this.expenses.data[rowIndex].expenseTitle = result['expenseTitle'];
    //     this.expenses.data[rowIndex].expenseDescription = result['expenseDescription'];
    //     this.expenses.data[rowIndex].moneySpent = result['moneySpent'];
    //     this.expenses.data[rowIndex].creationDate = result['creationDate'];
    //   }
    // });
  }

}

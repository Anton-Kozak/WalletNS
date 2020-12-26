import { Component, OnInit, ViewContainerRef, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { ExpenseService } from '../../_services/expense.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WalletService } from '../../_services/wallet.service';
import { AuthService } from '../../_services/auth.service';
import { ExpenseForTable } from '../../_models/expense-for-table';
import { ExpenseList } from '../../_models/expense-list';
import { LastMonthStat } from '../../_models/lastMonthStat';
import { CategoryData } from '../../_models/categoryData';
import { ObservableArray } from 'tns-core-modules/data/observable-array';
import { ModalDialogService } from '@nativescript/angular/modal-dialog';
import { DataService } from '../../_services/data.service';
import { ModalExpenseComponent } from '../../expenses/modal-expense/modal-expense.component';
import { ExpenseForBar } from '../../_models/barExpense';
import * as Toast from 'nativescript-toast';
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
    private router: Router,
    private modalDialog: ModalDialogService,
    private vcRef: ViewContainerRef,
    private dataService: DataService,) {
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
  barExpenses = null;
  currentMonthDataToCompare: ExpenseList;
  lastMonthDataToCompare: ExpenseList;
  mostSpentCategory: string;
  mostUsedCategory: string;
  lastSixMonths: LastMonthStat[];
  categories: CategoryData[] = [];
  isThisUser: boolean;
  showModal = false;

  @ViewChildren('rows') tableBody: QueryList<ElementRef>;
  private id;
  ngOnInit(): void {
    this.expService.updateHeaders();
    this.isThisUser = false;
    let userId = this.authService.decodedToken.nameid;
    this.id = this.route.snapshot.params['id'];
    if (userId === this.id)
      this.isThisUser = true;
    console.log('id', this.id);
    console.log('userid', userId);
    this.walletService.currentCategories.subscribe(value => {
      console.log('categories user', value);
      this.categories = value;
    });


    this.isLoading = true;
    //TODO: если в начале месяца, нет никаких трат, то здесь идет везде null, так как на сервере идет проверка на largestExpense > 0
    this.expService.getUserStatistics(this.id, new Date(Date.now()).toUTCString()).subscribe(response => {
      //console.log('response frm user', response);
      this.expService.getUserExpenses(this.id, new Date(Date.now()).toUTCString()).subscribe((expensesRecieved: ExpenseForTable[]) => {
        this.expenses = expensesRecieved;
      })
      this.amountOfMoneySpent = response['amountOfMoneySpent'];
      if (this.amountOfMoneySpent != 0) {
        this.avgDailyExpenses = response['averageDailyExpense'];
        this.currentMonthDataToCompare = response['monthCompareData']['currentMonthData'];
        this.lastMonthDataToCompare = response['monthCompareData']['lastMonthData'];
        let barArr: ExpenseForBar[] = [];
        response['barExpenses'].forEach((val, i) => {
          barArr.push({ Amount: val['categoryExpenses'], Category: this.categories[i].title })
        });
        this.barExpenses = new ObservableArray([...barArr]);
        this.lastSixMonths = response['lastSixMonths'].reverse();
        this.mostUsedCategory = response['mostUsedCategory'];
        this.mostSpentCategory = response['mostSpentCategory'];
      }
      this.isLoading = false;
      //console.log('l', this.tableBody.length);
    })

  }




  onExpenseTap(expense: ExpenseForTable, rowIndex: number) {
    this.modalDialog
      .showModal(ModalExpenseComponent, {
        fullscreen: true,
        viewContainerRef: this.dataService.getRootVCRef()
          ? this.dataService.getRootVCRef()
          : this.vcRef,
        context: expense
      }).then((result: { status: string, expense: ExpenseForTable }) => {
        if (result.status === 'edit') {
          //console.log('edit');
          this.expenses[rowIndex].expenseTitle = result.expense['expenseTitle'];
          this.expenses[rowIndex].expenseDescription = result.expense['expenseDescription'];
          this.expenses[rowIndex].moneySpent = result.expense['moneySpent'];
          this.expenses[rowIndex].creationDate = result.expense['creationDate'];
          this.expenses[rowIndex].userName = result.expense['userName'];
        }
        else if (result.status === 'delete') {
          this.expService.onExpenseDelete(expense.id).subscribe((response: any) => {
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

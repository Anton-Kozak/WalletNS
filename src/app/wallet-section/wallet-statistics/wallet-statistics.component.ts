import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../_services/expense.service';
import { Router } from '@angular/router';
import { WalletService } from '../../_services/wallet.service';
import { CategoryData } from '../../_models/categoryData';
import { TopUsersStat } from '../../_models/top-users-stat'
import { User } from '../../_models/user'
import { ObservableArray } from 'tns-core-modules/data/observable-array';
@Component({
  selector: 'ns-wallet-statistics',
  templateUrl: './wallet-statistics.component.html',
  styleUrls: ['./wallet-statistics.component.scss']
})
export class WalletStatisticsComponent implements OnInit {

  constructor(private expService: ExpenseService,
    private router: Router,
    private walletService: WalletService) { }


  isLoading: boolean;
  avgDailyExpenses: number;
  mostSpentCategory: string;
  mostUsedCategory: string;
  currentMonthDataToCompare = null;
  lastMonthDataToCompare = null;
  barExpenses = null;
  lastSixMonths = null;
  topFiveUsers: TopUsersStat[] = [];
  walletMembers: User[];
  amountOfMoneySpent: number;
  categories: CategoryData[] = [];
  hasPreviousMonths: boolean;
  ngOnInit(): void {
    this.expService.updateHeaders();
    if (this.walletService.currentCategories.length === 0) {
      this.walletService.getWalletsCategories().subscribe((data: CategoryData[]) => {
        this.walletService.currentCategories = data;
        this.categories = this.walletService.currentCategories;
      });
    } else
      this.categories = this.walletService.currentCategories;
    this.isLoading = true;
    this.expService.getWalletStatistics().subscribe(response => {
      //console.log(response);
      this.avgDailyExpenses = response['averageDailyExpense'];
      this.amountOfMoneySpent = response['amountOfMoneySpent'];
      if (response['hasExpenseData'] === true) {
        let previousMonth = response['barCompareExpensesWithLastMonth']['lastMonthData'];
        this.hasPreviousMonths = true;
        for (let i = 0; i < previousMonth.length; i++) {
          if (previousMonth[i].categoryExpenses === 0) {
            this.hasPreviousMonths = false;
            break;
          }
        }
        if (this.hasPreviousMonths) {
          let currMonth: { Amount: number, Category: string }[] = [];
          response['barCompareExpensesWithLastMonth']['currentMonthData'].forEach((val, i) => {
            currMonth.push({ Amount: val['categoryExpenses'], Category: this.categories[i].title })
          });
          this.currentMonthDataToCompare = new ObservableArray([...currMonth]);
          let lastMonth: { Amount: number, Category: string }[] = [];
          response['barCompareExpensesWithLastMonth']['lastMonthData'].forEach((val, i) => {
            lastMonth.push({ Amount: val['categoryExpenses'], Category: this.categories[i].title })
          });
          this.lastMonthDataToCompare = new ObservableArray([...lastMonth]);
        }
        let monthArr: { expenseSum: number, month: string }[] = [];
        response['lastSixMonths'].forEach((val) => {
          monthArr.push({ expenseSum: val['expenseSum'], month: val['month'] })
        });
        this.lastSixMonths = new ObservableArray([...monthArr]).reverse();
        response['topFiveUsers'].forEach((val, i) => {
          this.topFiveUsers.push({ Amount: val['sum'], userName: val['userName'] })
        });
        let barArr: { Amount: number, Category: string }[] = [];
        response['barExpenses'].forEach((val, i) => {
          barArr.push({ Amount: val['categoryExpenses'], Category: this.categories[i].title })
        });
        this.barExpenses = new ObservableArray([...barArr]);
        this.mostUsedCategory = response['mostUsedCategory'];
        this.mostSpentCategory = response['mostSpentCategory'];

      }
      this.walletMembers = response['walletUsers'];
      this.isLoading = false;
    });

  }

  getUserStatistics(id: string) {
    //console.log(id);

    this.router.navigate(['/wallet/userStatistics', id]);
  }
}

import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../_services/expense.service';
import { Router } from '@angular/router';
import { WalletService } from '../../_services/wallet.service';
import { CategoryData } from '../../_models/categoryData';
import { TopUsersStat } from '../../_models/top-users-stat'
import { User } from '../../_models/user'
import { ObservableArray } from 'tns-core-modules/data/observable-array';
import { ExpenseForBar } from 'src/app/_models/barExpense';
@Component({
  selector: 'ns-wallet-statistics',
  templateUrl: './wallet-statistics.component.html',
  styleUrls: ['./wallet-statistics.component.scss']
})
export class WalletStatisticsComponent implements OnInit {

  constructor(private expService: ExpenseService,
    private router: Router,
    private walletService: WalletService) { }

  userColors: string[] = ['#EAA219', '#D77D13', '#C4590C', '#B03406', '#9D1000'];

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
    this.expService.getWalletStatistics(new Date(Date.now()).toUTCString()).subscribe(response => {
      //console.log('resp', response['barExpenses']);
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
          let currMonth: ExpenseForBar[] = [];
          response['barCompareExpensesWithLastMonth']['currentMonthData'].forEach((val, i) => {
            currMonth.push({ Amount: val['categoryExpenses'], Category: this.categories[i].title })
          });
          this.currentMonthDataToCompare = new ObservableArray([...currMonth]);
          let lastMonth: ExpenseForBar[] = [];
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
        //this.topFiveUsers = response['topFiveUsers'];
        response['topFiveUsers'].forEach((val, i) => {
          this.topFiveUsers.push({ Amount: val['sum'], userName: val['userName'] })
        });
        //console.log('5', this.topFiveUsers);
        let barArr: ExpenseForBar[] = [];
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

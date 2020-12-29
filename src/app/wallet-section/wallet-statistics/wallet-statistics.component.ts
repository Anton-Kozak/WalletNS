import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../_services/expense.service';
import { Router } from '@angular/router';
import { WalletService } from '../../_services/wallet.service';
import { CategoryData } from '../../_models/categoryData';
import { TopUsersStat } from '../../_models/top-users-stat'
import { User } from '../../_models/user'
import { ObservableArray } from 'tns-core-modules/data/observable-array';
import { ExpenseForBar } from '../../_models/barExpense';
import { DataService } from '../../_services/data.service';
@Component({
  selector: 'ns-wallet-statistics',
  templateUrl: './wallet-statistics.component.html',
  styleUrls: ['./wallet-statistics.component.scss']
})
export class WalletStatisticsComponent implements OnInit {

  constructor(private expService: ExpenseService,
    private router: Router,
    private walletService: WalletService, private dataService: DataService) { }

  userColors: string[] = ['#EAA219', '#D77D13', '#C4590C', '#B03406', '#9D1000'];

  isLoading: boolean;
  hasExpenseData = false;
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
    this.walletService.currentCategories.subscribe(value => {
      this.categories = value;
    });
    this.isLoading = true;
    this.expService.getWalletStatistics(new Date(Date.now()).toUTCString()).subscribe(response => {
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
        //TODO: разобраться с интерфейсами чтобы не делать эти махинации с созданием ещё одних массивов
        response['topFiveUsers'].forEach((val) => {
          this.topFiveUsers.push({ Amount: val['sum'], userName: val['userName'] })
        });
        let barArr: ExpenseForBar[] = [];
        response['barExpenses'].forEach((val, i) => {
          barArr.push({ Amount: val['categoryExpenses'], Category: this.categories[i].title })
        });
        this.barExpenses = new ObservableArray([...barArr]);
        this.mostUsedCategory = response['mostUsedCategory'];
        this.mostSpentCategory = response['mostSpentCategory'];
        this.hasExpenseData = true;
      }
      this.walletMembers = response['walletUsers'];
      this.isLoading = false;
    });

  }

  getUserStatistics(id: string) {
    this.dataService.changeItemSubject.next(['walletStatistics', 'userStatistics']);
    this.router.navigate(['/wallet/userStatistics', id]);
  }


}

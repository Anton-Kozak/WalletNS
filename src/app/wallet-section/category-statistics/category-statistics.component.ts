import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../_services/expense.service';
import { ActivatedRoute } from '@angular/router';
import { WalletService } from '../../_services/wallet.service';
import { TopUsersStat } from '../../_models/top-users-stat';
import { LastMonthStat } from '../../_models/lastMonthStat';
import { ExpenseForTable } from '../../_models/expense-for-table';
import { CategoryData } from '../../_models/categoryData';
import { CategoryComparison } from '../../_models/category-comparison';
import { ObservableArray } from 'tns-core-modules/data/observable-array';
@Component({
  selector: 'ns-category-statistics',
  templateUrl: './category-statistics.component.html',
  styleUrls: ['./category-statistics.component.scss']
})
export class CategoryStatisticsComponent implements OnInit {

  constructor(private expService: ExpenseService,
    private route: ActivatedRoute,
    private walletService: WalletService) {
  }
  userColors: string[] = ['#EAA219', '#D77D13', '#C4590C', '#B03406', '#9D1000'];

  largestExpense: number;
  currentMonthLargestExpense: number;
  spentThisMonth: number;
  spentAll: number;
  chosenCategory: number;
  chosenCategoryName: string;
  currentMonthDataToCompare = null;
  lastMonthDataToCompare = null;
  mostSpentUser: TopUsersStat = { Amount: 0, userName: '' };
  //here sum is count
  mostUsedUser: TopUsersStat = { Amount: 0, userName: '' };
  // topFiveUsers = null;
  topFiveUsers: TopUsersStat[] = [];
  lastSixMonths: {month: string, expenseSum: number}[] = [];
  expenses: ExpenseForTable[] = [];
  showData = true;

  isLoading: boolean;
  ngOnInit(): void {
    this.expService.updateHeaders();
    this.walletService.getCurrentWallet();
    this.chosenCategoryName = this.route.snapshot.params['title'];//this.walletService.currentCategories.value.find(x => x.id === this.chosenCategory).title;
    this.chosenCategory = +this.route.snapshot.params['id'];
    if (this.chosenCategory !== null) {
      this.isLoading = true;
      this.expService.getCategoryStatistics(this.chosenCategory, new Date(Date.now()).toUTCString()).subscribe(data => {
        if (data['categoryExpenses'].length === 0) {
          this.showData = false;
        }
        else {
          this.expenses = data['categoryExpenses'];
          this.largestExpense = data['largestExpense'];
          this.currentMonthLargestExpense = data['currentMonthLargestExpense'];
          this.mostSpentUser = data['mostSpentUser'];
          this.mostUsedUser = data['mostUsedUser'];
          let lastMonth = { month: 'Last Month', amount: data['barCompareExpensesWithLastMonth']['lastMonthData'] }
          if (lastMonth.amount !== 0) {
            let currentMonth = { month: 'Current Month', amount: data['barCompareExpensesWithLastMonth']['currentMonthData'] }
            this.currentMonthDataToCompare = new ObservableArray([currentMonth]);
            this.lastMonthDataToCompare = new ObservableArray([lastMonth]);
          }
          this.spentThisMonth = data['spentThisMonth'];
          this.spentAll = data['spentAll'];
          data['topFiveUsers'].forEach((val) => {
            this.topFiveUsers.push({ Amount: val['sum'], userName: val['userName'] })
          });
          data['lastSixMonths'].forEach(val => {
            this.lastSixMonths.push({ expenseSum: val['expenseSum'], month: val['month'] })
          });
          //this.topFiveUsers = new ObservableArray([...data['topFiveUsers']]);
          this.lastSixMonths = new ObservableArray([...data['lastSixMonths']]).reverse();
          this.showData = true;
        }
        this.isLoading = false;
      });
    }
  }
}

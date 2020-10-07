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
  topFiveUsers = null;
  lastSixMonths = null;

  expenses: ExpenseForTable[] = [];

  showData = true;

  isLoading: boolean;
  ngOnInit(): void {
    this.expService.updateHeaders();
    this.route.params.subscribe(params => {

      this.walletService.getCurrentWallet();


      this.chosenCategory = +params['id'] || 0;
      if (this.walletService.currentCategories.length === 0) {
        this.walletService.getWalletsCategories().subscribe((data: CategoryData[]) => {
          this.walletService.currentCategories = data;
          this.chosenCategoryName = this.walletService.currentCategories.find(x => x.id === this.chosenCategory).title;
        });
      } else {
        this.chosenCategoryName = this.walletService.currentCategories.find(x => x.id === this.chosenCategory).title;
      }
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
          this.topFiveUsers = new ObservableArray([...data['topFiveUsers']]);
          this.lastSixMonths = new ObservableArray([...data['lastSixMonths']]).reverse();
          console.log(this.topFiveUsers);
          this.showData = true;
        }
        this.isLoading = false;
      });
    });

  }

}

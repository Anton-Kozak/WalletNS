import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../_services/wallet.service';
import { ExpenseService } from '../../_services/expense.service';
import * as moment from 'moment';
import { ExpensesWithCategories } from '../../_models/expensesWithCategories';
import { CategoryData } from '../../_models/categoryData';
import { TopUsersStat } from '../../_models/top-users-stat';
import { ExpenseForBar } from 'src/app/_models/barExpense';
import { ObservableArray } from 'tns-core-modules/data/observable-array';


@Component({
  selector: 'ns-previous-expenses',
  templateUrl: './previous-expenses.component.html',
  styleUrls: ['./previous-expenses.component.css']
})
export class PreviousExpensesComponent implements OnInit {

  constructor(private expenseService: ExpenseService, private walletService: WalletService) { }

  colors: string[] = ['#F4B41C', '#F39916', '#CB7510', '#BA4709', '#9D1000', '#730C00', '#490700', '#2D0400', '#1E0300', 'black'];
  userColors: string[] = ['#EAA219', '#D77D13', '#C4590C', '#B03406', '#9D1000'];


  first: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  second: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  third: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  fourth: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  fifth: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  sixth: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  seventh: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  eigth: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  nineth: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  tenth: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  isLoading: boolean = true;
  topFiveUsers: TopUsersStat[];
  barExpenses = null;
  categories: CategoryData[] = [];
  walletCurrency: string = 'USD';
  monthNumber = 1;
  monthName: string = '';
  year: string;
  date: Date;
  hasData = false;
  ngOnInit(): void {
    this.expenseService.updateHeaders();
    this.isLoading = true;
    this.date = new Date(Date.now());
    this.date.setMonth(this.date.getMonth() - 1);
    this.year = moment(this.date).format('YYYY');
    this.monthName = moment(this.date).format('MMMM');
    this.walletService.currentCategories.subscribe(value => {
      this.categories = value;
    });
    // this.walletService.getCurrentWallet().subscribe(wallet=>{
    //   this.walletCurrency = wallet['currency'];
    // })



    this.getData(this.date);
    // this.setTitle(this.translateService.currentLang);
    // this.translateService.onLangChange.subscribe(lang => {
    //   this.setTitle(lang['lang']);
    // });

  }



  getData(date: Date) {
    this.expenseService.getPreviousExpenses(date.toUTCString()).subscribe((expenses: ExpensesWithCategories[]) => {
      this.isLoading = true;
      //console.log('exp', expenses);
      if (expenses['topFiveUsers'].length > 0) {
        this.hasData = true;
        let barArr: ExpenseForBar[] = [];
        //console.log('get data prev expenses, categofris from prev exp: ', this.categories);
        for (let i = 0; i < expenses['previousExpensesBars'].length; i++) {
          //console.log(expenses['previousExpensesBars'][i]);
          barArr.push({ Amount: expenses['previousExpensesBars'][i]['categoryExpenses'], Category: this.categories[i].title })
        }
        this.barExpenses = new ObservableArray([...barArr]);
        this.topFiveUsers = expenses['topFiveUsers'];
        if (true) {
          if (expenses['previousMonthExpenses'][0]['expenses'].length > 0) {
            this.first.expenses = expenses['previousMonthExpenses'][0]['expenses'];
            this.first.categoryId = expenses['previousMonthExpenses'][0]['categoryId'];
            this.first.categoryName = expenses['previousMonthExpenses'][0]['categoryName'];
          }
          if (expenses['previousMonthExpenses'][1]['expenses'].length > 0) {
            this.second.expenses = expenses['previousMonthExpenses'][1]['expenses'];
            this.second.categoryId = expenses['previousMonthExpenses'][1]['categoryId'];
            this.second.categoryName = expenses['previousMonthExpenses'][1]['categoryName'];
          }
          if (expenses['previousMonthExpenses'][2]['expenses'].length > 0) {
            this.third.expenses = expenses['previousMonthExpenses'][2]['expenses'];
            this.third.categoryId = expenses['previousMonthExpenses'][2]['categoryId'];
            this.third.categoryName = expenses['previousMonthExpenses'][2]['categoryName'];
          }
          if (expenses['previousMonthExpenses'][3]['expenses'].length > 0) {
            this.fourth.expenses = expenses['previousMonthExpenses'][3]['expenses'];
            this.fourth.categoryId = expenses['previousMonthExpenses'][3]['categoryId'];
            this.fourth.categoryName = expenses['previousMonthExpenses'][3]['categoryName'];
          }
          if (expenses['previousMonthExpenses'][4]['expenses'].length > 0) {
            this.fifth.expenses = expenses['previousMonthExpenses'][4]['expenses'];
            this.fifth.categoryId = expenses['previousMonthExpenses'][4]['categoryId'];
            this.fifth.categoryName = expenses['previousMonthExpenses'][4]['categoryName'];
          }
          if (expenses['previousMonthExpenses'].length > 5) {
            if (expenses['previousMonthExpenses'][5]['expenses'].length > 0) {
              this.sixth.expenses = expenses['previousMonthExpenses'][5]['expenses'];
              this.sixth.categoryId = expenses['previousMonthExpenses'][5]['categoryId'];
              this.sixth.categoryName = expenses['previousMonthExpenses'][5]['categoryName'];
            }
            if (expenses['previousMonthExpenses'].length > 6) {
              if (expenses['previousMonthExpenses'][6]['expenses'].length > 0) {
                this.seventh.expenses = expenses['previousMonthExpenses'][6]['expenses'];
                this.seventh.categoryId = expenses['previousMonthExpenses'][6]['categoryId'];
                this.seventh.categoryName = expenses['previousMonthExpenses'][6]['categoryName'];
              }
              if (expenses['previousMonthExpenses'].length > 7) {
                if (expenses['previousMonthExpenses'][7]['expenses'].length > 0) {
                  this.eigth.expenses = expenses['previousMonthExpenses'][7]['expenses'];
                  this.eigth.categoryId = expenses['previousMonthExpenses'][7]['categoryId'];
                  this.eigth.categoryName = expenses['previousMonthExpenses'][7]['categoryName'];
                }
                if (expenses['previousMonthExpenses'].length > 8) {
                  if (expenses['previousMonthExpenses'][8]['expenses'].length > 0) {
                    this.nineth.expenses = expenses['previousMonthExpenses'][8]['expenses'];
                    this.nineth.categoryId = expenses['previousMonthExpenses'][8]['categoryId'];
                    this.nineth.categoryName = expenses['previousMonthExpenses'][8]['categoryName'];
                  }
                  if (expenses['previousMonthExpenses'].length > 9) {
                    if (expenses['previousMonthExpenses'][9]['expenses'].length > 0) {
                      this.tenth.expenses = expenses['previousMonthExpenses'][9]['expenses'];
                      this.tenth.categoryId = expenses['previousMonthExpenses'][9]['categoryId'];
                      this.tenth.categoryName = expenses['previousMonthExpenses'][9]['categoryName'];
                    }
                  }
                }
              }
            }
          }
        }
      }
      else
        this.hasData = false;
      this.isLoading = false;

    });
  }

  previousMonth() {
    this.isLoading = true;
    this.date = new Date(Date.now());
    this.monthNumber++;
    this.date.setMonth(this.date.getMonth() - this.monthNumber, 1);
    this.monthName = moment(this.date).format('MMMM');
    this.year = moment(this.date).format('YYYY');
    this.clearData();
    this.getData(this.date);
  }

  next() {
    console.log('current m', this.date.getMonth(), 'next m', new Date(Date.now()).getMonth());
    if (this.date.getMonth() < new Date(Date.now()).getMonth() - 1) {
      this.isLoading = true;
      if (this.monthNumber - 1 !== 0) {
        this.monthNumber--;
        this.date = new Date(Date.now());
        this.date.setMonth(this.date.getMonth() - this.monthNumber, 1);
        this.monthName = moment(this.date).format('MMMM');
        this.year = moment(this.date).format('YYYY');
        this.clearData();
        this.getData(this.date);
      }
    }
  }

  clearData() {
    this.isLoading = true;
    this.first = { categoryName: '', expenses: [], categoryId: 0 };
    this.second = { categoryName: '', expenses: [], categoryId: 0 };
    this.third = { categoryName: '', expenses: [], categoryId: 0 };
    this.fourth = { categoryName: '', expenses: [], categoryId: 0 };
    this.fifth = { categoryName: '', expenses: [], categoryId: 0 };
    this.sixth = { categoryName: '', expenses: [], categoryId: 0 };
    this.seventh = { categoryName: '', expenses: [], categoryId: 0 };
    this.eigth = { categoryName: '', expenses: [], categoryId: 0 };
    this.nineth = { categoryName: '', expenses: [], categoryId: 0 };
    this.tenth = { categoryName: '', expenses: [], categoryId: 0 };
    this.topFiveUsers = [];
    this.barExpenses = null;
  }

  getFormat(date) {
    return moment(date).format('lll');
  }

}

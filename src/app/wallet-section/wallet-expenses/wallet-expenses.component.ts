import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { ExpensesWithCategories } from '../../_models/expensesWithCategories';
import { ExpenseService } from '../../_services/expense.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { CategoryData } from '../../_models/categoryData';
import { WalletForPage } from '../../_models/wallet-for-page';
import { ModalDialogService } from '@nativescript/angular/modal-dialog';
import { DataService } from '../../_services/data.service';
import { CreateExpenseComponent } from '../../expenses/create-expense/create-expense.component';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';
import { ExpenseForTable } from 'src/app/_models/expense-for-table';

@Component({
  selector: 'ns-wallet-expenses',
  templateUrl: './wallet-expenses.component.html',
  styleUrls: ['./wallet-expenses.component.scss']
})
export class WalletExpensesComponent implements OnInit {


  constructor(private expenseService: ExpenseService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private modalDialog: ModalDialogService,
    private vcRef: ViewContainerRef,
    private dataService: DataService) { }
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

  walletTitle: string;
  walletLimit: number;
  walletExpenses: number;
  type: string;
  private id;
  expensesToShow: number;
  notifications: Notification[] = [];
  categories: CategoryData[] = [];
  isLoading: boolean;
  dayForDailyExpenses = new Date();
  moment: any = moment;
  currentSelectedDate: FormControl;
  dailyExpenses: ExpenseForTable[] = [];




  ngOnInit(): void {
    this.expenseService.updateHeaders();
    this.id = this.authService.getToken().nameid;
    this.isLoading = true;
    this.expenseService.getWalletData(this.id).subscribe((walletData: WalletForPage) => {
      this.walletTitle = walletData['title'];
      this.walletLimit = walletData['monthlyLimit'];
      this.expenseService.expensesSubject.subscribe(expData => {
        this.walletExpenses = expData;
        this.expensesToShow = expData;
        this.checkLimit();
      });


      this.checkLimit();
      this.expenseService.showAllExpenses();
      this.expenseService.firstSubject.subscribe(exp => {
        if (exp != null) {
          this.first.expenses = exp;
          this.first.categoryName = this.expenseService.firstExpenses.categoryName;
          this.first.categoryId = this.expenseService.firstExpenses.categoryId;
        }
      });

      this.expenseService.secondSubject.subscribe(exp => {
        if (exp != null) {
          this.second.expenses = exp;
          this.second.categoryName = this.expenseService.secondExpenses.categoryName;
          this.second.categoryId = this.expenseService.secondExpenses.categoryId;
        }
      });
      this.expenseService.thirdSubject.subscribe(exp => {
        if (exp != null) {
          this.third.expenses = exp;
          this.third.categoryName = this.expenseService.thirdExpenses.categoryName;
          this.third.categoryId = this.expenseService.thirdExpenses.categoryId;
        }
      });
      this.expenseService.fourthSubject.subscribe(exp => {
        if (exp != null) {
          this.fourth.expenses = exp;
          this.fourth.categoryName = this.expenseService.fourthExpenses.categoryName;
          this.fourth.categoryId = this.expenseService.fourthExpenses.categoryId;
        }
      });
      this.expenseService.fifthSubject.subscribe(exp => {
        if (exp != null) {
          this.fifth.expenses = exp;
          this.fifth.categoryName = this.expenseService.fifthExpenses.categoryName;
          this.fifth.categoryId = this.expenseService.fifthExpenses.categoryId;
        }
      });

      this.expenseService.sixthSubject.subscribe(exp => {
        if (exp != null) {
          this.sixth.expenses = exp;
          this.sixth.categoryName = this.expenseService.sixthExpenses.categoryName;
          this.sixth.categoryId = this.expenseService.sixthExpenses.categoryId;
        }
      });

      this.expenseService.seventhSubject.subscribe(exp => {
        if (exp != null) {
          this.seventh.expenses = exp;
          this.seventh.categoryName = this.expenseService.seventhExpenses.categoryName;
          this.seventh.categoryId = this.expenseService.seventhExpenses.categoryId;
        }
      });

      this.expenseService.eightthSubject.subscribe(exp => {
        if (exp != null) {
          this.eigth.expenses = exp;
          this.eigth.categoryName = this.expenseService.eightthExpenses.categoryName;
          this.eigth.categoryId = this.expenseService.eightthExpenses.categoryId;
        }
      });

      this.expenseService.ninethSubject.subscribe(exp => {
        if (exp != null) {
          this.nineth.expenses = exp;
          this.nineth.categoryName = this.expenseService.ninethExpenses.categoryName;
          this.nineth.categoryId = this.expenseService.ninethExpenses.categoryId;
        }
      });

      this.expenseService.tenthSubject.subscribe(exp => {
        if (exp != null) {
          this.tenth.expenses = exp;
          this.tenth.categoryName = this.expenseService.tenthExpenses.categoryName;
          this.tenth.categoryId = this.expenseService.tenthExpenses.categoryId;
        }
      });
      this.expenseService.showDailyExpenses(this.dayForDailyExpenses.toUTCString()).subscribe((expenses: ExpenseForTable[]) => {
        this.dailyExpenses = expenses;
      });
      this.currentSelectedDate = new FormControl(this.moment(this.dayForDailyExpenses).format('LL'));


      this.isLoading = false;
    });
    this.route.data.subscribe(data => {
      this.categories = data['categories'];
    })



    // this.noteService.getNotifications().subscribe((notifications: Notification[]) => {
    //   this.notifications = notifications;
    // })
  }

  checkLimit() {
    if (this.walletLimit != 0) {
      this.expensesToShow = this.walletExpenses;

      if (this.walletExpenses < 0.25 * this.walletLimit) {
        this.type = 'success';
      } else if (this.walletExpenses < 0.5 * this.walletLimit) {
        this.type = 'info';
      } else if (this.walletExpenses < 0.75 * this.walletLimit) {
        this.type = 'warning';
      } else if (this.walletExpenses < 0.90 * this.walletLimit) {
        this.type = 'danger';
      }
      else if (this.walletExpenses >= this.walletLimit) {
        this.expensesToShow = this.walletLimit;
        this.type = 'danger';
      }
    }
  }

  addExpense() {
    this.modalDialog
      .showModal(CreateExpenseComponent, {
        fullscreen: true,
        viewContainerRef: this.dataService.getRootVCRef()
          ? this.dataService.getRootVCRef()
          : this.vcRef,
      })
  }

  addCategoryExpense(categoryId: number, categoryName: string) {
    this.modalDialog
      .showModal(CreateExpenseComponent, {
        fullscreen: true,
        viewContainerRef: this.dataService.getRootVCRef()
          ? this.dataService.getRootVCRef()
          : this.vcRef,
        context: { id: categoryId, name: categoryName }
      })
  }

  showNotifications() {
    // this.notifications.forEach(element => {
    //   console.log(element.message);
    // });
    // this.noteService.deleteNotifications().subscribe(() => {
    //   console.log('Success');

    // })
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }


  changeDay(direction: number) {
    if (direction === 0)
      this.dayForDailyExpenses.setDate(this.dayForDailyExpenses.getDate() - 1);
    else
      this.dayForDailyExpenses.setDate(this.dayForDailyExpenses.getDate() + 1);

    this.updateDailyExpenses();
  }

  updateDailyExpenses() {
    this.expenseService.showDailyExpenses(this.dayForDailyExpenses.toUTCString()).subscribe((expenses: ExpenseForTable[]) => {
      this.currentSelectedDate.patchValue(this.moment(this.dayForDailyExpenses).format('ll'));
      this.dailyExpenses = expenses;
    })

  }

}

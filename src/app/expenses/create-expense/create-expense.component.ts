import { Component, OnInit } from '@angular/core';
import { Expense } from '../../_models/expense';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryData } from '../../_models/categoryData';
import { ExpenseService } from '../../_services/expense.service';
import { WalletService } from '../../_services/wallet.service';
import { ModalDialogParams } from '@nativescript/angular/modal-dialog';


@Component({
  selector: 'ns-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.scss']
})
export class CreateExpenseComponent implements OnInit {

  expense: Expense;
  newExpenseForm: FormGroup;
  categoryTitles: CategoryData[] = [];
  selectedCategoryId: number;
  selectedCategoryName: string;
  constructor(private expenseService: ExpenseService,
    private walletService: WalletService,
    private modalParams: ModalDialogParams) { }

  ngOnInit(): void {
    this.selectedCategoryId = this.modalParams.context.id;
    this.selectedCategoryName = this.modalParams.context.name;
    console.log('Selected category id', this.selectedCategoryId);
    this.newExpenseForm = new FormGroup({
      'title': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]),
      'desc': new FormControl('', [Validators.minLength(4), Validators.maxLength(20)]),
      'category': new FormControl('', [Validators.required]),
      'money': new FormControl('', Validators.required)
    })
    if (this.walletService.currentCategories.length === 0) {
      this.walletService.getWalletsCategories().subscribe((data: CategoryData[]) => {
        this.walletService.currentCategories = data;
        this.categoryTitles = this.walletService.currentCategories;
      });
    }
    else
      this.categoryTitles = this.walletService.currentCategories;
  }

  createExpense() {
    console.log('form submit!');
    console.log(this.newExpenseForm.value['category']);

    if (this.newExpenseForm.errors == null) {
      this.expense = {
        expenseCategoryId: this.selectedCategoryId,//this.newExpenseForm.value['category'],
        expenseTitle: this.newExpenseForm.value['title'],
        expenseDescription: this.newExpenseForm.value['desc'],
        moneySpent: this.newExpenseForm.value['money'],
        creationDate: new Date()
      }
      this.expenseService.createExpense(this.expense).subscribe((response: any) => {
        if (response['message'] === null) {

          this.modalParams.closeCallback();
        }
        else {
          //this.alertify.warning(response['message']);
          this.modalParams.closeCallback();
        }
      }, error => {
        //this.alertify.error("You did not create an expense");
      });
    }
  }

  back() {
    this.modalParams.closeCallback();
  }


}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Expense } from '../../_models/expense';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryData } from '../../_models/categoryData';
import { ExpenseService } from '../../_services/expense.service';
import { WalletService } from '../../_services/wallet.service';
import { ModalDialogParams } from '@nativescript/angular/modal-dialog';
import { ListPicker } from "tns-core-modules/ui/list-picker";

@Component({
  selector: 'ns-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.scss']
})
export class CreateExpenseComponent implements OnInit {

  expense: Expense;
  newExpenseForm: FormGroup;
  categoryTitles: CategoryData[] = [];
  @ViewChild('selectedCategory', { static: false }) selectedCategory: ElementRef;
  constructor(private expenseService: ExpenseService,
    private walletService: WalletService,
    private modalParams: ModalDialogParams) { }

  ngOnInit(): void {
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
        console.log('titles', this.categoryTitles);
      });
    }
    else {
      this.categoryTitles = this.walletService.currentCategories;
      console.log('titles', this.categoryTitles);
    }
  }

  createExpense() {
    console.log('form submit!');
    if (this.newExpenseForm.errors == null) {
      let id = (<ListPicker>(this.selectedCategory.nativeElement)).selectedIndex;
      this.expense = {
        expenseCategoryId: (<CategoryData>(<ListPicker>(this.selectedCategory.nativeElement)).items[id]).id,
        //expenseCategoryId: this.selectedCategoryId,//this.newExpenseForm.value['category'],
        expenseTitle: this.newExpenseForm.value['title'],
        expenseDescription: this.newExpenseForm.value['desc'],
        moneySpent: this.newExpenseForm.value['money'],
        creationDate: new Date()
      }
      console.log(this.expense);
      this.expenseService.createExpense(this.expense).subscribe((response: any) => {
        if (response['message'] === null) {

          this.modalParams.closeCallback();
        }
        else {
          this.modalParams.closeCallback();
        }
      }, error => {
        console.log(error);
      });
    }
  }

  back() {
    this.modalParams.closeCallback();
  }


}

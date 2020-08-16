import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from '@nativescript/angular/modal-dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExpenseForTable } from '../../_models/expense-for-table';
import * as Toast from 'nativescript-toast';
import { ExpenseService } from '../../_services/expense.service';
import { AdminService } from '../../_services/admin.service';
import { ExpenseForAdminTable } from 'src/app/_models/expense-for-admin-table';

@Component({
  selector: 'ns-modal-expense',
  templateUrl: './modal-expense.component.html',
  styleUrls: ['./modal-expense.component.scss']
})
export class ModalExpenseComponent implements OnInit {
  expenseForm: FormGroup;
  expense: ExpenseForTable;
  isAdmin: boolean;
  constructor(private modalParams: ModalDialogParams,
    private expService: ExpenseService,
    private adminService: AdminService) { }

  ngOnInit(): void {
    if (this.modalParams.context['isAdmin'] !== null) {
      this.isAdmin = true;
    }
    else {
      this.isAdmin = false;
    }
    this.expense = this.modalParams.context['expense'];
    console.log('Expense on init', this.expense);
    this.expenseForm = new FormGroup({
      'title': new FormControl(this.expense.expenseTitle, { updateOn: 'change', validators: [Validators.required, Validators.minLength(4)] }),
      'description': new FormControl(this.expense.expenseDescription, { updateOn: 'change', validators: [Validators.minLength(4), Validators.max(20)] }),
      'money': new FormControl(this.expense.moneySpent, { updateOn: 'change', validators: [Validators.required] }),
    })
  }


  onEdit() {
    if (this.expenseForm.valid) {
      let expToEdit: ExpenseForTable = {
        id: this.expense.id,
        creationDate: this.expense.creationDate,
        expenseTitle: this.expenseForm.value['title'],
        expenseDescription: this.expenseForm.value['description'],
        moneySpent: this.expenseForm.value['money'],
        userName: this.expense.userName
      };
      if (this.expense.userName === expToEdit.userName && this.expense.creationDate === expToEdit.creationDate && this.expense.expenseTitle === expToEdit.expenseTitle && this.expense.moneySpent === expToEdit.moneySpent) {
        var toast = Toast.makeText("You have not made any changes!");
        toast.show();
      }
      else {
        this.expService.onExpenseEdit(expToEdit).subscribe((editedExpense: ExpenseForTable) => {
          let result: { status: string, expense: ExpenseForTable };
          result = { status: 'edit', expense: editedExpense };
          this.modalParams.closeCallback(result);
        });
      }
    }
  }

  onEditAdmin() {
    if (this.expenseForm.valid) {
      console.log(this.expense);
      let expToEdit: ExpenseForAdminTable = {
        id: this.expense.id,
        creationDate: this.expenseForm.value['date'],
        expenseTitle: this.expenseForm.value['title'],
        expenseDescription: this.expenseForm.value['description'],
        moneySpent: this.expenseForm.value['money'],
        userName: this.expense.userName,
        category: this.expense.expenseCategory,
        isAdmin: true
      };
      if (this.expense.userName == expToEdit.userName && this.expense.creationDate === expToEdit.creationDate && this.expense.expenseTitle === expToEdit.expenseTitle && this.expense.moneySpent === expToEdit.moneySpent) {
        var toast = Toast.makeText("You have not made any changes!")
        toast.show();
      }
      else {
        this.adminService.onExpenseEdit(expToEdit).subscribe(() => {
          let result: { status: string, expense: ExpenseForTable };
          result = { status: 'edit', expense: this.expense };
          console.log(result.expense);
          this.modalParams.closeCallback(result);
        });
      }
    }
  }

  back() {
    this.modalParams.closeCallback();
  }

  deleteExpense() {
    let result: { status: string, expense: ExpenseForTable };
    result = { status: 'delete', expense: null };
    this.modalParams.closeCallback(result);
  }

}

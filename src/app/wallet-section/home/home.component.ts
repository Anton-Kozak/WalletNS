import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { ExpensesWithCategories } from 'src/app/_models/expensesWithCategories';
@Component({
  selector: 'ns-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  first: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  members: { name: string, roles: string[] }[] = [];
  constructor() { }
  ngOnInit(): void {
    this.members = [
      {
        name: 'test',
        roles: ['tests', 'dfsds']
      },
      {
        name: 'test2',
        roles: ['tests', 'dfsds']
      },
      {
        name: 'test3',
        roles: ['tests', 'dfsds']
      },
      {
        name: 'test4',
        roles: ['tests', 'dfsds']
      }
    ];
    this.first.expenses = [{
      id: 1,
      expenseTitle: 'Tesbcvbcbt',
      creationDate: new Date(),
      expenseCategory: 'Meat',
      expenseDescription: 'Desc',
      userName: 'User',
      moneySpent: 15,
    },
    {
      id: 2,
      expenseTitle: 'Tes23t',
      creationDate: new Date(),
      expenseCategory: 'Meat',
      expenseDescription: 'Desasdadc',
      userName: 'Use2r',
      moneySpent: 16,
    },
    {
      id: 3,
      expenseTitle: 'Test',
      creationDate: new Date(),
      expenseCategory: 'Meat',
      expenseDescription: 'Defghghsc',
      userName: 'User',
      moneySpent: 15,
    },
    {
      id: 4,
      expenseTitle: 'Test23',
      creationDate: new Date(),
      expenseCategory: 'Meat',
      expenseDescription: 'Dergvrgesc',
      userName: 'User',
      moneySpent: 15,
    }]
  }


  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }



}

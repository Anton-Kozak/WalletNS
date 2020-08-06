import { ExpenseForTable } from './expense-for-table';

export interface ExpensesWithCategories{
    expenses: ExpenseForTable[];
    categoryId: number;
    categoryName: string;
}
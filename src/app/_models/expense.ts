export interface Expense {
    id?: number;
    expenseCategoryId: number,
    expenseTitle: string,
    expenseDescription?: string,
    creationDate: Date,
    moneySpent: number
}

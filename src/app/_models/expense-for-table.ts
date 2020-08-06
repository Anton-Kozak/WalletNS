export interface ExpenseForTable {
    id: number,
    userName: string,
    expenseDescription: string,
    expenseCategory?: string,
    expenseTitle: string,
    creationDate: Date,
    moneySpent: number
}

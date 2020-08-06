export interface ExpenseForAdminTable {
    id: number,
    userName: string,
    expenseDescription: string,
    expenseTitle: string,
    creationDate: Date,
    moneySpent: number,
    category: string,
    isAdmin: boolean,
}

import type { ExpenseRepository } from "@/repoitories/expense.repository";
import type { ExpenseCreateInput, Expense } from "@/types/expense-types";

import { sequelize } from "@/db";
import { expenseRepository } from "@/repoitories/expense.repository";
import { HttpError } from "@common/src";


export class ExpenseService {
        constructor(private readonly repository: ExpenseRepository){}

        async createSingleExpense(input: ExpenseCreateInput): Promise<Expense>{
                const expense = await this.repository.createSingleExpense(input)
                return expense
        }

        async createMultipleExpenses(input: ExpenseCreateInput[]): Promise<Expense[]>{
                const expenses = await this.repository.createMultipleExpenses(input)
                return expenses
        }

        async findExpenseById(id: string): Promise<Expense>{
                const expense = await this.repository.findExpenseById(id)
                if(!expense){
                        throw new HttpError(404, 'Expense not found')
                }
                return expense;
        }

        async findAllExpensesForUser(userId: string): Promise<Expense[]>{
                const expenses = await this.repository.findAllExpensesForUser(userId)
                if(!expenses){
                        throw new HttpError(404, 'User has no known expenses')
                }
                return expenses
        }

        async findExpensesForFixedPeriod(userId: string, from: Date, to: Date): Promise<Expense[]>{
                const expenses = await this.repository.findExpensesForFixedPeriod(userId, from, to)
                if(!expenses){
                        throw new HttpError(404, 'Expenses were not found for chosen time period')
                }

                return expenses
        }

        async findExpensesForFlexiblePeriod(userId: string, from: Date): Promise<Expense[]>{
                const expenses = await this.repository.findExpensesForFlexiblePeriod(userId, from)
                if(!expenses){
                        throw new HttpError(404, 'Expenses were not found for chosen time period')
                }

                return expenses
        }
}


export const expenseService = new ExpenseService(expenseRepository);
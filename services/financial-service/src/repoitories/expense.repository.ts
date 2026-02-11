// import {Op, type WhereOptions} from 'sequelize';

// import type { CreateUserInput, User } from '@/types/user';
// import type { AuthUserRegisteredPayload } from '@common/src';

// import { UserModel } from '@/db/models/user.model';

// const toDomainUser = (model: UserModel): User => ({
//         id: model.id,
//         email: model.email,
//         displayName: model.displayName,
//         createdAt: model.createdAt,
//         updatedAt: model.updatedAt,
// });


import { Op, type WhereOptions } from "sequelize";

import type { ExpenseCreateInput, Expense } from "@/types/expense-types";
import { ExpenseModel } from "@/db";
import { Where } from "sequelize/types/utils";



const toDomainExpense = (model: ExpenseModel): Expense => ({
        userId: model.userId,
        id: model.id,
        mcc: model.mcc,
        description: model.description,
        currencyCode: model.currencyCode,
        cashback: model.cashback,
        commissionRate: model.commissionRate,
        balance: model.balance,
        time: model.time,
        amount: model.amount,
        createdAt: model.createdAt,
        updatedAt: model.updatedAt
})




export class ExpenseService{
        async createSingleExpense(payload: ExpenseCreateInput){
                const expense = await ExpenseModel.create(payload)
                return toDomainExpense(expense)
        }


        async createMultipleExpenses(payload: ExpenseCreateInput[]):Promise<Expense[]> {
                const expenses = await ExpenseModel.bulkCreate(payload)
                return expenses
        }


        async findExpenseById(id: string):Promise<Expense | null> {
                const expense = await ExpenseModel.findByPk(id)
                return expense? toDomainExpense(expense) : null
        }


        async findAllExpensesForUser(userId: string):Promise<Expense[]> {
                const expenses = await ExpenseModel.findAll({
                        where: {
                                userId: userId
                        }
                });
                return expenses;
        }


        async findExpensesForFixedPeriod(userId: string, from: Date, to: Date): Promise<Expense[]>{
                const expenses = await ExpenseModel.findAll({
                        where:{
                                createdAt: {
                                        [Op.gte]: from,
                                        [Op.lte]: to
                                },
                                userId: {
                                        [Op.eq]: userId
                                }
                        }
                })
                return expenses
        }


        async findExpensesForFlexiblePeriod(userId: string, from: Date): Promise<Expense[]>{
                const expenses = await ExpenseModel.findAll({
                        where: {
                                createdAt:{
                                        [Op.gte]: from
                                },
                                userId:{
                                        [Op.eq]: userId
                                }
                        }
                })
                return expenses
        }
}
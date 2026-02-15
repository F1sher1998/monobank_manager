import { expenseService } from "@/services/expense.service";
import { SearchExpensePeriod, CreateExpenseBody, IdParams } from "@/validation/expense.schema";
import type { AsyncHandler } from "@common/src";


export const createSingleExpense: AsyncHandler = async(req, res, next) => {
        try{
                const payload = req.body as CreateExpenseBody;
                const expense = await expenseService.createSingleExpense(payload);
                res.status(201).json({ data: expense })
        }catch(error){
                next(error)
        }

}


export const createMultipleExpenses: AsyncHandler = async(req, res, next) => {
        try{
                const payload = req.body as CreateExpenseBody[];
                const expense = await expenseService.createMultipleExpenses(payload);
                res.status(201).json({ data: expense })
        }catch(error){
                next(error)
        }
}


export const findExpenseById: AsyncHandler = async(req, res, next) => {
        try{
                const { id } = req.params as unknown as IdParams;
                const expense = await expenseService.findExpenseById(id)
                res.json({data: expense})
        }catch(error){
                next(error)
        }
}


export const findExpensesForUser: AsyncHandler = async(req, res, next) => {
        try{
                const { id } = req.params as unknown as IdParams;
                const expenses = await expenseService.findAllExpensesForUser(id)
                res.json({ data: expenses });
        }catch(error){
                next(error)
        }
}


export const findExpensesForFixedPeriod: AsyncHandler = async(req, res, next) => {
        try{
                const { id } = req.params as unknown as IdParams;
                const { from, to } = req.body as unknown as SearchExpensePeriod;
                const expenses = await expenseService.findExpensesForFixedPeriod(id, from, to!)
                res.json({data: expenses})
        }catch(error){
                next(error)
        }
}


export const findExpensesForFlexiblePeriod: AsyncHandler = async(req, res, next) => {
        try{
                const { id } = req.params as unknown as IdParams;
                const { from } = req.body as unknown as SearchExpensePeriod;
                const expenses = await expenseService.findExpensesForFlexiblePeriod(id, from)
                res.json({data: expenses})
        }catch(error){
                next(error)
        }
}



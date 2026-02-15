import { Router } from "express";
import {
         createSingleExpense, 
         createMultipleExpenses, 
         findExpenseById, 
         findExpensesForUser, 
         findExpensesForFixedPeriod, 
         findExpensesForFlexiblePeriod 
        } from "@/controllers/expense.controller";
import { createExpenseSchema, idParamsSchema, searchExpenseForPeriodSchema } from "@/validation/expense.schema";
import { asyncHandler, validateRequest } from "@common/src";


export const expenseRoutes: Router = Router();


expenseRoutes.post('/single', validateRequest({body: createExpenseSchema}), asyncHandler(createSingleExpense));
expenseRoutes.post('/multiple', validateRequest({body: createExpenseSchema}), asyncHandler(createMultipleExpenses));
expenseRoutes.get('/expense/:id', validateRequest({params: idParamsSchema}), asyncHandler(findExpenseById));
expenseRoutes.post('/fixed/:id', validateRequest({params: idParamsSchema, body:  searchExpenseForPeriodSchema}), asyncHandler(findExpensesForFixedPeriod));
expenseRoutes.post('/flexible/:id', validateRequest({params: idParamsSchema, body: searchExpenseForPeriodSchema}), asyncHandler(findExpensesForFlexiblePeriod));
expenseRoutes.get('/user-expenes/:id', validateRequest({params: idParamsSchema}), asyncHandler(findExpensesForUser))
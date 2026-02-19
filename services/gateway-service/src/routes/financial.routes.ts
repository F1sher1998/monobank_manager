import { 
  createSingleExpense,
  createMultipleExpenses,
  findExpenseById,
  findExpensesForUser,
  findExpensesForFixedPeriod,
  findExpensesForFlexiblePeriod
} from "@/controllers/financial.controller";
import {
  createSingleExpenseSchema,
  createMultipleExpensesSchema,
  searchExpenseByIdSchema,
  searchForPeriod,
  getAllUserExpensesSchema,
  expenseIdParamsSchema
} from "@/validation/financial.schema";
import { asyncHandler, validateRequest } from "@common/src";
import { requireAuth } from "@/middleware/require-auth";
import { Router } from "express";

export const financialRouter: Router = Router();
financialRouter.get('/expense/:id', requireAuth, validateRequest({ params: expenseIdParamsSchema }), asyncHandler(findExpenseById));
financialRouter.get('/user/:id', requireAuth, asyncHandler(findExpensesForUser));
financialRouter.post('/single', validateRequest({ body: createSingleExpenseSchema }), asyncHandler(createSingleExpense));
financialRouter.post('/multiple', validateRequest({ body: createMultipleExpensesSchema }), asyncHandler(createMultipleExpenses));
financialRouter.post('/fixed/:id', requireAuth, validateRequest({ body: searchForPeriod }), asyncHandler(findExpensesForFixedPeriod));
financialRouter.post('/flexible/:id', requireAuth, validateRequest({ body: searchForPeriod }), asyncHandler(findExpensesForFlexiblePeriod));


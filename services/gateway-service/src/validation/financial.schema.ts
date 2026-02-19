import { z } from '@common/src';

export const createSingleExpenseSchema = z.object({
        userId: z.string().uuid(),
        time: z.date(),
        description: z.string(),
        mcc: z.number(),
        amount: z.number(),
        currencyCode: z.number(),
        commissionrate: z.number(),
        cashback: z.number(),
        balance: z.number()
})


export const createMultipleExpensesSchema = z.object({
        expenses: z.array(createSingleExpenseSchema)
})


export const searchExpenseByIdSchema = z.object({
        userId: z.string(),
        id: z.string(),
})

export const searchForPeriod = z.object({
        userId: z.string(),
        from: z.date(),
        to: z.date().optional()
})


export const getAllUserExpensesSchema = z.object({
        userId: z.string()
})

export const expenseIdParamsSchema = z.object({
        id: z.string().uuid()
})

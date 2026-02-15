import { z } from '@common/src';

export const createExpenseSchema = z.object({
        userId: z.string(),
        id: z.string().uuid(),
        time: z.date().max(Date.now()),
        description: z.string().min(3).max(255),
        mcc: z.number(),
        amount: z.number(),
        currencyCode: z.number(),
        commissionRate: z.number(),
        cashback: z.number(),
        balance: z.number(),
        createdAt: z.date(),
        updatedAt: z.date()
})


export const idParamsSchema = z.object({
        id: z.string().uuid(),
})


export const searchExpenseForPeriodSchema = z.object({
        userId: idParamsSchema,
        from: z.date(),
        to: z.date().optional()
});


export type SearchExpensePeriod = z.infer<typeof searchExpenseForPeriodSchema>;
export type CreateExpenseBody = z.infer<typeof createExpenseSchema>;
export type IdParams = z.infer<typeof idParamsSchema>
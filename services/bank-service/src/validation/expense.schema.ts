import { z } from "@common/src";


export const createExpenseSchema = z.object({
    time: z.date(),
    description: z.string().min(3),
    mcc: z.number(),
    amount: z.number(),
    currencyCode: z.number(),
    commissionRate: z.string(),
    cashback: z.number(),
    balance: z.number(),
});

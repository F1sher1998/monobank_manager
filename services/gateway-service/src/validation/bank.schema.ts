import { z } from '@common/src';

export const createBakUserSchema = z.object({
        displayName: z.string(),
        apiKey: z.string(),
        clientId: z.string().optional()
}) 

export const bankUserIdParamsSchema = z.object({
        id: z.string().uuid()
})

export const createCardSchema = z.object({
        identifier: z.string(),
        currencyCode: z.number(),
        balance: z.number()
})

export const cardIdParamsSchema = z.object({
        id: z.string().uuid()
})

export type CreateBankUserSchema = z.infer<typeof createBakUserSchema>;
export type BankUserIdParams = z.infer<typeof bankUserIdParamsSchema>;
export type CreateCardSchema = z.infer<typeof createCardSchema>;
export type CardIdParams = z.infer<typeof cardIdParamsSchema>;

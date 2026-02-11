import { z } from "@common/src";


export const createBankUserSchema = z.object({
    bankName: z.string().min(3),
    apiKey: z.string(),
    clientId: z.string()    
})


export type CreateBankUserBody = z.infer<typeof createBankUserSchema>;

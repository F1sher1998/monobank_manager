import { z } from '@common/src'


export const registerSchema = z.object({
  body: z.object({
    apiKey: z.string().email(),
    bankName: z.string().min(8),
  }),
});
import 'dotenv/config'
import { createEnv, z } from '@common/src'

const envSchema = z.object({
        NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
        FINANCE_SERVICE_PORT: z.coerce.number().int().min(0).max(65_535).default(4004),
        FINANCE_DB_URL: z.string(),
        REDIS_DB_URL: z.string(),
        RABBITMQ_DB_URL: z.string().optional(),
        INTERNAL_API_TOKEN: z.string().min(16),
        BANK_SERVICE_URL: z.string().url(),
})


type EnvType  = z.infer<typeof envSchema>;

export const env: EnvType = createEnv(envSchema, {
        serviceName: 'financial-service',
});

export type Env = typeof env;
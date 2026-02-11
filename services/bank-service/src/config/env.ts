import 'dotenv/config'
import { createEnv, z } from '@common/src';

const envSchema = z.object({
        NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
        BANK_SERVICE_PORT: z.coerce.number().int().min(0).max(65_535).default(4003),
        BANK_DB_URL: z.string(),
        RABBITMQ_DB_URL: z.string().optional(),
        INTERNAL_API_TOKEN: z.string().min(16),
})


type EnvType  = z.infer<typeof envSchema>;

export const env: EnvType = createEnv(envSchema, {
        serviceName: 'bank-service',
});

export type Env = typeof env;
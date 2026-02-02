import 'dotenv/config';
import { createEnv, z } from '@common/src';
const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    USER_SERVICE_PORT: z.coerce.number().int().min(0).max(65_535).default(4001),
    USER_DB_URL: z.string(),
    RABBITMQ_URL: z.string().optional(),
    INTERNAL_API_TOKEN: z.string().min(16),
});
export const env = createEnv(envSchema, {
    serviceName: 'user-service'
});
//# sourceMappingURL=env.js.map
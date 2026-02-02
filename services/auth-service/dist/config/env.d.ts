import 'dotenv/config';
import { z } from "@common/src";
declare const envSchema: any;
type EnvType = z.infer<typeof envSchema>;
export declare const env: EnvType;
export type Env = typeof env;
export {};
//# sourceMappingURL=env.d.ts.map
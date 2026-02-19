import { createLogger } from "@common/src";
import type { Logger } from "@common/src";

export const logger: Logger = createLogger({ name: 'gateway-service' });
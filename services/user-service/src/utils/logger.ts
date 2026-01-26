import { createLogger } from "../../../../packages/common/src";
import type { Logger } from "../../../../packages/common/src";

export const logger: Logger = createLogger({ name: 'user-service' })
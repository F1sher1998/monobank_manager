import type { UserCreatedPayload } from "@common/src";
export declare const initTransactions: () => Promise<void>;
export declare const closeTransactions: () => Promise<void>;
export declare const publishUserCreatedEvent: (payload: UserCreatedPayload) => Promise<void>;
//# sourceMappingURL=event-messaging.d.ts.map
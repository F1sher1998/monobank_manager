import { EventPayload, OutboundEvent } from "@/events/event-types";
export declare const AUTH_EVENT_EXCHANGE = "auth.events";
export declare const AUTH_USER_REGISTERED_ROUTING_KEY = "auth.user.registered";
export interface AuthUserRegisteredPayload extends EventPayload {
    id: string;
    displayName: string;
    email: string;
    passwordHash: string;
    createdAt: string;
}
export type AuthRegisteredEvent = OutboundEvent<typeof AUTH_USER_REGISTERED_ROUTING_KEY, AuthUserRegisteredPayload>;
//# sourceMappingURL=auth-events.d.ts.map
import { EventPayload, OutboundEvent } from "@/events/event-types";

export const AUTH_EVENT_EXCHANGE = 'auth.events';
export const AUTH_USER_REGISTERED_ROUTING_KEY = 'auth.user.registered';


export interface AuthUserRegisteredPayload extends EventPayload {
     id: string;
     displayName: string;
     apiKey: string;
     email: string;
     createdAt: string;   
}


export type AuthRegisteredEvent = OutboundEvent<
typeof AUTH_USER_REGISTERED_ROUTING_KEY, 
AuthUserRegisteredPayload
>

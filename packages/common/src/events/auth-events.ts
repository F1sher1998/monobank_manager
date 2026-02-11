import { EventPayload, OutboundEvent } from "@/events/event-types";

export const AUTH_EVENT_EXCHANGE = 'auth.events';
export const AUTH_USER_REGISTERED_ROUTING_KEY = 'auth.user.registered';


export interface AuthUserRegisteredPayload extends EventPayload {
     id: string;
     displayName: string;
     email: string;
     createdAt: string;   
}


export type AuthRegisteredEvent = OutboundEvent<
typeof AUTH_USER_REGISTERED_ROUTING_KEY, 
AuthUserRegisteredPayload
>




export const AUTH_BANK_USER_PAYLOAD_KEY = 'auth.bank.user.payload'

export interface AuthBankUserPayload extends EventPayload {
     id: string;
     bankName: string;
     apiKey: string;
     createdAt: string;
}


export type AuthBankUserPayloadEvent = OutboundEvent<typeof AUTH_BANK_USER_PAYLOAD_KEY, AuthBankUserPayload>
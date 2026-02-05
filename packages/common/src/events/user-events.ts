import { EventPayload, OutboundEvent } from '../events/event-types';



export const USER_EVENTS_EXCHANGE = 'user.events';
export const USER_CREATED_ROUTING_KEY = 'user.created';


export interface UserCreatedPayload extends EventPayload {
     id: string;
     email: string;
     createdAt: string;
     updatedAt: string;
}

export type UserCreatedEvent = OutboundEvent<typeof USER_CREATED_ROUTING_KEY, UserCreatedPayload>;
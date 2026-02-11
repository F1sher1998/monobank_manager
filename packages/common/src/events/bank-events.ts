import { OutboundEvent, EventPayload } from "./event-types";


export const BANK_USER_EVENTS_EXCHANGE = 'bank-user.events';
export const BANK_USER_CREATED_ROUTING_KEY = 'bank-user.created';


export interface BankUserCreatedPayload extends EventPayload {
    id: string;
    apiKey: string;
    bankName: string;
    createdAt: Date;
    updatedAt: Date;
}

export type BankUserCreatedEvent = OutboundEvent<typeof BANK_USER_CREATED_ROUTING_KEY ,BankUserCreatedPayload>;






export const EXPENSE_EVENTS_EXCHANGE = 'bank-expense.events';
export const EXPENSE_CREATED_ROUTING_KEY = 'bank-expense.created';


export interface ExpenseCreatedPayload extends EventPayload {
    id: string;
    description: string;
    time: Date;
    amount: number;
    mcc: number;
    cashback: number;
    currencyCode: number;
    commissionRate: number;
    balance: number;
    createdAt: Date;
    updatedAt: Date;
}

export type ExpenseCreatedEvent = OutboundEvent<typeof EXPENSE_CREATED_ROUTING_KEY, ExpenseCreatedPayload>;

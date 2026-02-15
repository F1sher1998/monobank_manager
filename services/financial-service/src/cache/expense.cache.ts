import type { Expense } from "@/types/expense-types";
import { v4 as uuidv4 } from 'uuid';
import { getRedisClient } from "@/clients/redis.client";


const CACHE_PREFIX_1 = 'expense'
const CACHE_PREFIX_2 = 'expense-arrays'
const CACHE_TTL_MINUTES_1 = 900 /* 15 minutes **/
const CACHE_TTL_MINUTES_2 = 1800 /* 30 minutes **/


const serializeSingle = (expense: Expense): string => {
        return JSON.stringify({
                ...expense,
                createdAt: expense.createdAt.toISOString(),
                updatedAt: expense.updatedAt.toISOString()
        });
};


const serializeMultiple = (expenses: Expense[]): string => {
        return JSON.stringify(
                expenses.map(expense => ({
                        ...expense,
                        createdAt: expense.createdAt.toISOString(),
                        updatedAt: expense.updatedAt.toISOString()
                }))
        );
}



const reviveExpense = (
        parsed: Expense & { createdAt: string; updatedAt: string }
        ): Expense => {
                return {
                        ...parsed,
                        createdAt: new Date(parsed.createdAt),
                        updatedAt: new Date(parsed.updatedAt)
        };
};



const deserializeSingle = (raw: string): Expense => {
        const parsed = JSON.parse(raw) as Expense & {
                createdAt: string,
                updatedAt: string
        }
        return reviveExpense(parsed)
};



const deserializeMultiple = (raw: string): Expense[] => {
        const parsed = JSON.parse(raw) as (Expense & {
                createdAt: string,
                updatedAt: string
        })[];

        return parsed.map(reviveExpense)
}


export const coversationCache = {
        async getSingle(expenseId: string): Promise<Expense | null>{
                const redis = getRedisClient()
                const payload = await redis.get(`${CACHE_PREFIX_1}:${expenseId}`);
                return payload ? deserializeSingle(payload) : null;
        },

        async setSingle(expense: Expense): Promise<void> {
                const redis = getRedisClient();
                await redis.setex(
                        `${CACHE_PREFIX_1}:${expense.id}`,
                        CACHE_TTL_MINUTES_1,
                        serializeSingle(expense)
                )
        },

        async getMultiple(expensesKey: string): Promise<Expense[] | null>{
                const redis = getRedisClient()
                const payload = await redis.get(`${CACHE_PREFIX_2}:${expensesKey}`)
                return payload ? deserializeMultiple(payload) : null
        },

        async setMultiple(expenses: Expense[]): Promise<string> {
                const redis = getRedisClient();
                const key = uuidv4();

                await redis.setex(
                        `${CACHE_PREFIX_2}:${key}`,
                        CACHE_TTL_MINUTES_2,
                        serializeMultiple(expenses)
                )
                return key;
        },

        async deleteSingle(expenseId: string): Promise<void>{
                const redis = getRedisClient()
                await redis.del(`${CACHE_PREFIX_1}:${expenseId}`);
        },

        async deleteArray(expenseKey: string): Promise<void>{
                const redis = getRedisClient()
                await redis.del(`${CACHE_PREFIX_2}:${expenseKey}`)
        }
}
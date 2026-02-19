import { HttpError } from '@common/src';
import axios from 'axios';

import { env } from '@/config/env';

const client = axios.create({
  baseURL: env.FINANCE_SERVICE_URL,
  timeout: 5000,
});

const authHeader = {
  headers: {
    'X-Internal-Token': env.INTERNAL_API_TOKEN,
  },
} as const;

export interface Expense {
  userId: string;
  id: string;
  time: string;
  description: string;
  mcc: number;
  amount: number;
  currencyCode: number;
  commissionRate: number;
  cashback: number;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseResponse {
  data: Expense;
}

export interface ExpenseListResponse {
  data: Expense[];
}

export interface CreateExpensePayload {
  userId: string;
  id: string;
  time: string;
  description: string;
  mcc: number;
  amount: number;
  currencyCode: number;
  commissionRate: number;
  cashback: number;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export interface SearchExpensePeriodPayload {
  userId: string;
  from: string;
  to?: string;
}

export interface IdParams {
  id: string;
}

const resolvedMessage = (status: number, data: unknown): string => {
  if (typeof data === 'object' && data && 'message' in data) {
    const message = (data as Record<string, unknown>).message;
    if (typeof message === 'string' && message.trim().length > 0) {
      return message;
    }
  }

  return status >= 500
    ? 'Financial service is unavailable'
    : 'An error occurred while processing the request';
};

const handleAxiosError = (error: unknown): never => {
  if (!axios.isAxiosError(error) || !error.response) {
    throw new HttpError(500, 'Financial service is unavailable');
  }

  const { status, data } = error.response as { status: number; data: unknown };

  throw new HttpError(status, resolvedMessage(status, data));
};

export const financialProxyService = {
  async createSingleExpense(payload: CreateExpensePayload): Promise<ExpenseResponse> {
    try {
      const response = await client.post<ExpenseResponse>('/users/single', payload, authHeader);
      return response.data;
    } catch (error) {
      return handleAxiosError(error);
    }
  },

  async createMultipleExpenses(payload: CreateExpensePayload[]): Promise<ExpenseListResponse> {
    try {
      const response = await client.post<ExpenseListResponse>('/users/multiple', payload, authHeader);
      return response.data;
    } catch (error) {
      return handleAxiosError(error);
    }
  },

  async findExpenseById(id: string): Promise<ExpenseResponse> {
    try {
      const response = await client.get<ExpenseResponse>(`/users/expense/${id}`, authHeader);
      return response.data;
    } catch (error) {
      return handleAxiosError(error);
    }
  },

  async findExpensesForFixedPeriod(id: string, payload: SearchExpensePeriodPayload): Promise<ExpenseListResponse> {
    try {
      const response = await client.post<ExpenseListResponse>(`/users/fixed/${id}`, payload, authHeader);
      return response.data;
    } catch (error) {
      return handleAxiosError(error);
    }
  },

  async findExpensesForFlexiblePeriod(id: string, payload: Omit<SearchExpensePeriodPayload, 'to'>): Promise<ExpenseListResponse> {
    try {
      const response = await client.post<ExpenseListResponse>(`/users/flexible/${id}`, payload, authHeader);
      return response.data;
    } catch (error) {
      return handleAxiosError(error);
    }
  },

  async findExpensesForUser(id: string): Promise<ExpenseListResponse> {
    try {
      const response = await client.get<ExpenseListResponse>(`/users/user-expenses/${id}`, authHeader);
      return response.data;
    } catch (error) {
      return handleAxiosError(error);
    }
  },
};


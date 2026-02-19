import { HttpError } from '@common/src';
import axios from 'axios';

import { env } from '@/config/env';

const client = axios.create({
  baseURL: env.BANK_SERVICE_URL,
  timeout: 5000,
});

const authHeader = {
  headers: {
    'X-Internal-Token': env.INTERNAL_API_TOKEN,
  },
} as const;

export interface BankUser {
  id: string;
  apiKey: string;
  bankName: string;
  createdAt: string;
  updatedAt: string;
}

export interface BankUserResponse {
  data: BankUser;
}

export interface BankUserListResponse {
  data: BankUser[];
}

export interface CreateBankUserPayload {
  bankName: string;
  apiKey: string;
  clientId: string;
}

export interface Card {
  id: string;
  identifier: string;
  currencyCode: number;
  balance: number;
  updatedAt: string;
}

export interface CardResponse {
  data: Card;
}

export interface CardListResponse {
  data: Card[];
}

export interface CreateCardPayload {
  identifier: string;
  currencyCode: number;
  balance: number;
}

const resolvedMessage = (status: number, data: unknown): string => {
  if (typeof data === 'object' && data && 'message' in data) {
    const message = (data as Record<string, unknown>).message;
    if (typeof message === 'string' && message.trim().length > 0) {
      return message;
    }
  }

  return status >= 500
    ? 'Bank service is unavailable'
    : 'An error occurred while processing the request';
};

const handleAxiosError = (error: unknown): never => {
  if (!axios.isAxiosError(error) || !error.response) {
    throw new HttpError(500, 'Bank service is unavailable');
  }

  const { status, data } = error.response as { status: number; data: unknown };

  throw new HttpError(status, resolvedMessage(status, data));
};

export const bankProxyService = {
  async createBankUser(payload: CreateBankUserPayload): Promise<BankUserResponse> {
    try {
      const response = await client.post<BankUserResponse>('/bank-users', payload, authHeader);
      return response.data;
    } catch (error) {
      return handleAxiosError(error);
    }
  },

  async getAllBankUsers(): Promise<BankUserListResponse> {
    try {
      const response = await client.get<BankUserListResponse>('/bank-users', authHeader);
      return response.data;
    } catch (error) {
      return handleAxiosError(error);
    }
  },

  async getBankUserById(id: string): Promise<BankUserResponse> {
    try {
      const response = await client.get<BankUserResponse>(`/bank-users/${id}`, authHeader);
      return response.data;
    } catch (error) {
      return handleAxiosError(error);
    }
  },

  async createCard(payload: CreateCardPayload): Promise<CardResponse> {
    try {
      const response = await client.post<CardResponse>('/cards', payload, authHeader);
      return response.data;
    } catch (error) {
      return handleAxiosError(error);
    }
  },

  async getCardById(id: string): Promise<CardResponse> {
    try {
      const response = await client.get<CardResponse>(`/cards/${id}`, authHeader);
      return response.data;
    } catch (error) {
      return handleAxiosError(error);
    }
  },

  async createMultipleCards(payload: CreateCardPayload): Promise<CardResponse> {
    try{
      const response = await client.post<CardResponse>('/cards-many', authHeader);
      return response.data
    }catch(error){
      return handleAxiosError(error)
    }
  }
}
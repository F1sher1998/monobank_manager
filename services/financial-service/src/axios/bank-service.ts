import axios from "axios";
import { env } from "@/config/env";
import { HttpError } from "@common/src";

const bankServiceClient = axios.create({
    baseURL: env.BANK_SERVICE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

bankServiceClient.interceptors.request.use((config) => {
    config.headers['X-Internal-Token'] = env.INTERNAL_API_TOKEN;
    return config;
});

bankServiceClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            throw new HttpError(error.response.status, error.response.data?.message || 'Bank service error');
        }
        throw new HttpError(500, 'Network error');
    }
);

export interface BankUserResponse {
    id: string;
    apiKey: string;
    bankName: string;
    createdAt: string;
    updatedAt: string;
}

export const getBankUserById = async (id: string): Promise<BankUserResponse> => {
    const response = await bankServiceClient.get<{ data: BankUserResponse }>(`/bank-users/${id}`);
    return response.data.data;
};

export const getAllBankUsers = async (): Promise<BankUserResponse[]> => {
    const response = await bankServiceClient.get<{ data: BankUserResponse[] }>('/bank-users');
    return response.data.data;
};

export const getBankUserByApiKey = async (apiKey: string): Promise<BankUserResponse | null> => {
    const users = await getAllBankUsers();
    return users.find(user => user.apiKey === apiKey) || null;
};

export const bankService = {
    getBankUserById,
    getAllBankUsers,
    getBankUserByApiKey,
};


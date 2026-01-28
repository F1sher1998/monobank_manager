export interface User {
        id: string;
        clientId: string;
        bankName: string;
        createdAt: Date;
        updatedAt: Date;
}


export interface Card {
        id: string;
        identifier: string;
        currencyCode: number;
        balance: number;
}


export interface Jar {
        id: string;
        title: string;
        description?: string;
        identifier: string;
        currencyCode: number;
        balance: number;
        goal: number;
}
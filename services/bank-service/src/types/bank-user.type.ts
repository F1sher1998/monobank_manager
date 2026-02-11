export interface BankUser {
        id: string;
	apiKey: string;
        bankName: string;
        createdAt: Date;
        updatedAt: Date;
}


export interface BankUserCreateInput {
	apiKey: string;
	clientId: string;
	bankName: string;
}

export interface Card {
        id: string;
        identifier: string;
        currencyCode: number;
        balance: number;
	updatedAt: Date;
}

export interface CardCreateInput {
	indentifier: string;
	currencyCode: number;
	balance: number;
}


export interface Jar {
        id: string;
	sendId: string;
	title: string;
	description: string | null;
	currencyCode: number;
	balance: number;
	goal: number;
}

export interface JarCreateInput {
	title: string;
	description?: string;
	identifier: string;
	currencyCode: number;
	balance: number;
	goal: number
}



export interface Expense {
	id: string;
	time: Date;
	description: string;
	mcc: number;
	amount: number;
	currencyCode: number;
	commissionRate: number;
	cashback: number;
	balance: number;
	createdAt: Date;
	updatedAt: Date;
}


export interface ExpenseCreateInput {
	time: Date;
	description: string;
	mcc: number;
	amount: number;
	currencyCode: number;
	commissionRate: number;
	cashback: number;
	balacne: number;
}

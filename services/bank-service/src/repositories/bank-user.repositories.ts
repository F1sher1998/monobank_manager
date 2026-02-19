import { Op, type WhereOptions } from "sequelize";

import type { BankUser, BankUserCreateInput, CardCreateInput, Card } from "@/types/bank-user.type";
import { HttpError, type AuthBankUserPayload, type BankUserCreatedPayload } from '@common/src';

import { BankUserModel } from "@/db/models/bank-user.model";
import { CardModel } from "@/db/models/card.model";

const toDomainBankUser = (model: BankUserModel): BankUser => ({
    id: model.id,
    apiKey: model.apiKey,
    bankName: model.bankName,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
});


export class BankUserRepository {
    async create(data: BankUserCreateInput): Promise<BankUser>{
	const user = await BankUserModel.create(data);
	return toDomainBankUser(user)
    }

    async upsertFromAuthEvent(payload: AuthBankUserPayload): Promise<BankUser>{
	const [user] = await BankUserModel.upsert({
	    id: payload.id,
	    apiKey: payload.apiKey,
	    bankName: payload.bankName,
	    createdAt: new Date(payload.createdAt),
	    updatedAt: new Date(payload.createdAt),
	},
	{ returning: true }
	);

	return toDomainBankUser(user)
    }

    async findAll(): Promise<BankUser[]>{
	const users = await BankUserModel.findAll();
	return users.map(toDomainBankUser);
    }

    async findById(id: string): Promise<BankUser | null>{
	const user = await BankUserModel.findByPk(id);
	return user ? toDomainBankUser(user) : null;
    }


    async createCard(payload: CardCreateInput): Promise<Card>{
	const card = await CardModel.create(payload)
	return card
    }

    async createMultipleCards(payload: CardCreateInput[]): Promise<Card[]>{
	const cards = await CardModel.bulkCreate(payload)
	return cards
    }

    async findCardById(id: string): Promise<Card>{
	const card = await CardModel.findByPk(id)
	if(!card){
		throw new HttpError(404, 'Card with this ID was not found')
	}
	return card
    }
}


export const bankUserRepository = new BankUserRepository();

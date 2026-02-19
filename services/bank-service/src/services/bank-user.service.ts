import { BankUserRepository } from "@/repositories/bank-user.repositories";
import type { BankUserCreateInput, BankUser, Card, CardCreateInput } from "@/types/bank-user.type";

import { sequelize } from "@/db/sequelize";
import { bankUserRepository } from "@/repositories/bank-user.repositories";
import { AuthBankUserPayload, AuthUserRegisteredPayload, HttpError } from "@common/src";
import { UniqueConstraintError } from "sequelize";


class BankUserService{
        constructor(private readonly repository: BankUserRepository){}

        async createUser(input: BankUserCreateInput): Promise<BankUser>{
                try{
                        const user = await this.repository.create(input)
                        
                        return user
                }catch(error){
                        if(error instanceof UniqueConstraintError){
                                throw new HttpError(409, 'Bank user already exists')
                        }
                        throw error
                }       
        }


        async AuthSyncUser(payload: AuthBankUserPayload): Promise<BankUser>{
                const user = this.repository.upsertFromAuthEvent(payload)

                return user;
        }

        async getAllUsers(): Promise<BankUser[]>{
                return this.repository.findAll();
        }

        async getUserById(id: string): Promise<BankUser | null>{
                return this.repository.findById(id);
        }

        async createCard(paylaod: CardCreateInput): Promise<Card>{
                return this.repository.createCard(paylaod)
        }

        async createMultipleCards(payload: CardCreateInput[]): Promise<Card[]>{
                return this.repository.createMultipleCards(payload)
        }

        async getCardById(id: string): Promise<Card>{
                return this.repository.findCardById(id)
        }
}


export const bankUserService = new BankUserService(bankUserRepository)

import { BankUserRepository } from "@/repositories/bank-user.repositories";
import type { BankUserCreateInput, BankUser } from "@/types/bank-user.type";

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
}


export const bankUserService = new BankUserService(bankUserRepository)
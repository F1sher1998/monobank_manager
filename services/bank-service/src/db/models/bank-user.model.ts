import { DataTypes, Model } from 'sequelize';

import type { User, Jar, Card } from '@/types/bank-user.type';
import type { Optional } from 'sequelize';
import { sequelize } from '@/db/sequelize';


export type BankUserCreationAttributes = Optional<User, 'id' | 'createdAt' | 'updatedAt'>;

export class BankUserModel extends Model<User, BankUserCreationAttributes> implements User {
        declare id: string;
        declare clientId: string;
        declare bankName: string;
        declare createdAt: Date;
        declare updatedAt: Date;
}


BankUserModel.init({


})
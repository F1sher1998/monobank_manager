import type { BankUser} from '@/types/bank-user.type';
import { DataTypes, Model, type Optional } from 'sequelize';
import { sequelize } from '@/db/sequelize';



export type BankUserCreationAttributes = Optional<BankUser, 'id' | 'createdAt' | 'updatedAt'>;

export class BankUserModel extends Model<BankUser, BankUserCreationAttributes> implements BankUser {
        declare id: string;
	declare apiKey: string;
        declare bankName: string;
        declare createdAt: Date;
        declare updatedAt: Date;
}


BankUserModel.init({
    id: {
	type: DataTypes.UUID,
	allowNull: false,
	primaryKey: true,
	defaultValue: DataTypes.UUIDV4
    },

    apiKey: {
	type: DataTypes.STRING,
	allowNull: false,
	unique: true,
    },


    bankName: {
	type: DataTypes.STRING,
	allowNull: false,
	unique: false,
    },

    createdAt: {
	type: DataTypes.DATE,
	allowNull: false,
	defaultValue: DataTypes.NOW
    },

    updatedAt: {	
	type: DataTypes.DATE,
	allowNull: false,
	defaultValue: DataTypes.NOW
    },
    },
    {
	sequelize, tableName: 'bank_users'
    },
);

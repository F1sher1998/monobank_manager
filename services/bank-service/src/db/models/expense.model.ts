import { Model, DataTypes, type Optional } from "sequelize";
import { Expense } from "@/types/bank-user.type";
import { sequelize } from "../sequelize";


export type ExpenseCreationAttributes = Optional<Expense, 'id' | 'createdAt' | 'updatedAt'>;


export class ExpenseModel extends Model<Expense, ExpenseCreationAttributes> implements Expense {
    declare id: string;
    declare mcc: number;
    declare description: string; 
    declare currencyCode: number;
    declare cashback: number;
    declare commissionRate: number;
    declare balance: number;
    declare time: Date;
    declare amount: number;
    declare createdAt: Date;
    declare updatedAt: Date;
}


ExpenseModel.init({
    id: {
	type: DataTypes.UUID,
	allowNull: false,
	defaultValue: DataTypes.UUIDV4
    },

    mcc: {
	type: DataTypes.NUMBER,
	allowNull: false,
    },

    description: {
	type: DataTypes.STRING,
	allowNull: false,
    },

    currencyCode: {
	type: DataTypes.NUMBER,
	allowNull: false,
    },

    cashback: {
	type: DataTypes.NUMBER,
	allowNull: false,
    },

    commissionRate: {
	type: DataTypes.NUMBER,
	allowNull: false,
    },

    balance: {
	type: DataTypes.NUMBER,
	allowNull: false,
    },
    
    time: {
	type: DataTypes.DATE,
	allowNull: false,
	defaultValue: DataTypes.NOW
    },
    
    amount: {
	type: DataTypes.NUMBER,
	allowNull: false,
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
    }
}, {sequelize, tableName: 'expense'}
);

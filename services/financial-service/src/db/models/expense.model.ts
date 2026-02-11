import { Model, DataTypes, type Optional } from "sequelize";
import { sequelize } from "@/db/sequelize";
import { Expense } from "@/types/expense-types";


export type ExpenseCreationAttributes = Optional<Expense, 'id' | 'createdAt' | 'updatedAt'>;


export class ExpenseModel extends Model<Expense, ExpenseCreationAttributes> implements Expense {
    declare id: string;
    declare userId: string;
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


ExpenseModel.init(
    {   

        userId: {
             type: DataTypes.STRING,
             allowNull: false,
        },
        
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },

        mcc: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        currencyCode: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        cashback: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0
        },

        commissionRate: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0
        },

        balance: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
            defaultValue: 0
        },
        
        time: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        
        amount: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
            defaultValue: 0
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
    },
    {
        sequelize,
        tableName: 'expenses',
        modelName: 'Expense'
    }
);


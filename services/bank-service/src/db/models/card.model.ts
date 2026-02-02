import { DataTypes, Model, UUIDV4, type Optional } from "sequelize";
import type { Card } from "@/types/bank-user.type";
import { sequelize } from "../sequelize";



export type CardCreationAttributes = Optional<Card, 'id' | 'updatedAt'>;


export class CardModel extends Model<Card, CardCreationAttributes> implements Card{
    declare id: string;
    declare identifier: string;
    declare currencyCode: number;
    declare balance: number;
    declare updatedAt: Date;
}


CardModel.init({
    id: {
	type: DataTypes.UUID,
	allowNull: false,
	defaultValue: UUIDV4,
    },

    identifier: {
	type: DataTypes.STRING,
	allowNull: false,
	unique: true,
    },

    currencyCode: {
	type: DataTypes.NUMBER,
	allowNull: false,
    },

    balance: {
	type: DataTypes.NUMBER,
	allowNull: false
    },

    updatedAt: {
	type: DataTypes.DATE,
	allowNull: false,
	defaultValue: DataTypes.NOW
    }
}, {sequelize, tableName: 'card'})

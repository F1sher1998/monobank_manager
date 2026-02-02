import { DataTypes, Model, type Optional } from "sequelize";
import { Jar } from "@/types/bank-user.type";
import { sequelize } from "../sequelize";


export type JarCreationAttributes = Optional<Jar, 'id' | 'updatedAt'>;

export class JarModel extends Model<Jar, JarCreationAttributes> implements Jar{
    
declare id: string;
declare title: string;
declare description: string;
declare identifier: string;
declare currencyCode: number;
declare goal: number;
declare balance: number;
declare updatedAt: Date;
}


JarModel.init({
    id: {
	type: DataTypes.UUID,
	allowNull: false,
	primaryKey: true,
	defaultValue: DataTypes.UUIDV4
    },

    title: {
	type: DataTypes.STRING,
	allowNull: false,
    },

    description: {
	type: DataTypes.STRING,
	allowNull: true,
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
    
    goal: {
	type: DataTypes.NUMBER,
	allowNull: false,
    },

    balance: {
	type: DataTypes.NUMBER,
	allowNull: false,
    },

    updatedAt: {
	type: DataTypes.DATE,
	allowNull: false,
	defaultValue: DataTypes.NOW
    },
}, {sequelize, tableName: 'jar'},)

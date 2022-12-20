import Sequelize from "sequelize";
import { database, hasherIds } from "../module/index.js";

const accountModel = database.define(
	"account",
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			get() {
				return hasherIds.encode(this.getDataValue("id"))
			}
		},
		login: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		isAdmin: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	},
	{
		paranoid: true,
		indexes: [
			{ unique: true, fields: ["login"] }
		]
	},
);

export default accountModel;

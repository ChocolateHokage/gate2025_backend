import Sequelize from "sequelize";
import { database, hasherIds } from "../module/index.js";

const authModel = database.define("auth", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        get() {
            return hasherIds.encode(this.getDataValue("id"))
        }
    },
    hash_password: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

export default authModel;
import { Sequelize } from "sequelize";
import { database } from "../module/index.js";

const sessionModel = database.define("session", {
    refresh_token: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

export default sessionModel
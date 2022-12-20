import { Sequelize } from 'sequelize';
import { database, hasherIds } from '../module/index.js';

const datesModel = database.define("dates", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get() {
            return hasherIds.encode(this.getDataValue("id"))
        }
    },
    projectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        get() {
            return hasherIds.encode(this.getDataValue("projectId"))
        }
    },
    object_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    hours: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
})

export default datesModel
import Sequelize from 'sequelize';
import { database, hasherIds } from '../module/index.js';

const projectModel = database.define(
    "projects",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            get() {
                return hasherIds.encode(this.getDataValue("id"))
            }
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        date: {
            type: Sequelize.DATEONLY,
            allowNull: false
        }
    },
)

export default projectModel
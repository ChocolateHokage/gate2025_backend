import { Sequelize } from "sequelize";

const account = process.env.DB_USERNAME ?? "",
    password = process.env.DB_PASSWORD ?? "",
    database = process.env.DB_NAME ?? "",
    host = process.env.DB_HOST ?? "localhost";

export default new Sequelize(database, account, password, {
    host,
    dialect: "mysql",
    logging: false,
});
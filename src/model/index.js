import authModel from "./auth.model.js";
import sessionModel from "./session.model.js";
import accountModel from "./account.model.js";
import projectModel from './project.model.js';
import datesModel from "./dates.model.js";

//account <== auth
accountModel.hasOne(authModel)
authModel.belongsTo(accountModel)

//account <== session
accountModel.hasMany(sessionModel)
sessionModel.belongsTo(accountModel)

//dates <== projects
projectModel.hasMany(datesModel)
datesModel.belongsTo(projectModel)


export {
    authModel,
    sessionModel,
    accountModel,
    projectModel,
    datesModel
}
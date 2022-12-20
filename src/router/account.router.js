import { Router } from "express";
import {
	addAccount,
	login,
	logout,
	refresh
} from "../controller/account.controller.js";
import { checkAuth, checkAccess } from "../module/index.js"
import { accountValidator } from '../validators/index.js';

const accountRouter = Router();

accountRouter.route("/sign").post(accountValidator.login, login).delete(checkAuth, logout);
accountRouter.route("/refresh").get(refresh)
accountRouter.route("/accounts").post( /* checkAuth,checkAccess, */ accountValidator.addAccount, addAccount)

export default accountRouter;

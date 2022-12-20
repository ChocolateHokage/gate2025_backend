import { ApiError, Token } from "./index.js";

export default async function (req, res, next) {
    try {
        const auth_header = req.headers.authorization;
        if (!auth_header) {
            next(ApiError.UnauthorizedError());
            return;
        }

        if (auth_header.split(" ")[0] !== "Bearer") {
            next(ApiError.BadRequest());
            return;
        }

        const access_token = auth_header.split(" ")[1];

        if (!access_token) {
            next(ApiError.UnauthorizedError());
            return;
        }

        const account_data = Token.validateAccessToken(access_token);
        if (!account_data) {
            next(ApiError.UnauthorizedError());
            return;
        }
        req.account = account_data;
        next();
    } catch (error) {
        next(ApiError.UnauthorizedError());
    }
}
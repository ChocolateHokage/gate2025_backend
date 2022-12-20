import { ApiError } from "./index.js"

export default async function (req, res, next) {
    try {
        if (req.account && req.account.isAdmin) {
            if (req.account.isAdmin) {
                next()
            } else {
                throw ApiError.Forbidden()
            }
        } else {
            throw ApiError.UnauthorizedError()
        }
    } catch (error) {
        next(error)
    }
}
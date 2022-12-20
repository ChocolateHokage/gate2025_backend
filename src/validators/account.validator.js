import { Joi, validate } from "express-validation"

const v = (shema) => validate(shema, { keyByField: true })


export default {
    addAccount: v({
        body: Joi.object({
            login: Joi.string().min(2).max(20).required().messages({
                "string.base": "Логин должен быть строкой",
                "string.min": "Логин должен быть длинее 1 символа",
                "string.max": "Логин должен быть не длинее 20 символов"
            }),
            password: Joi.string().min(6).max(20).required().messages({
                "string.base": "Пароль должен быть строкой",
                "string.min": "Пароль должен быть длинее 5 символов",
                "string.max": "Пароль должен быть не длинее 20 символов"
            }),
            isAdmin: Joi.boolean()
        })
    }),
    login: v({
        body: Joi.object({
            login: Joi.string().min(2).max(20).required().messages({
                "string.base": "Логин должен быть строкой",
                "string.min": "Логин должен быть длинее 1 символа",
                "string.max": "Логин должен быть не длинее 20 символов"
            }),
            password: Joi.string().min(6).max(20).required().messages({
                "string.base": "Пароль должен быть строкой",
                "string.min": "Пароль должен быть длинее 5 символов",
                "string.max": "Пароль должен быть не длинее 20 символов"
            }),
        })
    })
}
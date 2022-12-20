import { Joi, validate } from "express-validation"

const v = (shema) => validate(shema, { keyByField: true })

export default {
    addObject: v({
        body: Joi.object({
            name: Joi.string().required().messages({
                "string.base": "Имя объекта должно быть строкой"
            }),
            hours: Joi.number().integer().min(0).messages({
                "number.base": "Часы должны указываться в виде числа",
                "number.integer": "Часы должны указываться в виде целого числа",
                "number.positive": "Часы должны указываться в виде целого положительного числа"
            })
        }),
        params: Joi.object({
            project_id: Joi.string().required()
        })
    }),
    getObjectById: v({
        params: Joi.object({
            date_id: Joi.string().required()
        })
    }),
    updateObject: v({
        params: Joi.object({
            date_id: Joi.string().required()
        }),
        body: Joi.object({
            name: Joi.string().messages({
                "string.base": "Имя объекта должно быть строкой"
            }),
            hours: Joi.number().integer().min(0).messages({
                "number.base": "Часы должны указываться в виде числа",
                "number.integer": "Часы должны указываться в виде целого числа",
                "number.min": "Часы должны указываться в виде целого положительного числа"
            }),
        })
    }),
    deleteObject: v({
        params: Joi.object({
            date_id: Joi.string().required()
        })
    })
}
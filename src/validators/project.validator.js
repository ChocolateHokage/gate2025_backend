import { Joi, validate } from "express-validation"

const v = (schema) => validate(schema, { keyByField: true })
export default {
    addProject: v({
        body: Joi.object({
            name: Joi.string().required().messages({
                "string.base": "Имя проекта должно быть строкой"
            }),
            date: Joi.string().pattern(/\d{1,2}\.\d{1,2}\.\d{4}/).required()
        })
    }),
    updateProject: v({
        body: Joi.object({
            name: Joi.string().messages({
                "string.base": "Имя проекта должно быть строкой"
            }),
            params: Joi.object({
                project_id: Joi.string().required()
            })
        })
    }),
    deleteProject: v({
        params: Joi.object({
            project_id: Joi.string().required()
        })
    }),
    getObjectByProjectId: v({
        params: Joi.object({
            project_id: Joi.string().required()
        })
    }),
    getProjectsByDate: v({
        params: Joi.object({
            date: Joi.string().pattern(/\d{1,2}\.\d{1,2}\.\d{4}/).required()
        })
    }),
    getProjects: v({
        query: Joi.object({
            dateFrom: Joi.string().pattern(/\d{1,2}\.\d{1,2}\.\d{4}/).required(),
            dateTo: Joi.string().pattern(/\d{1,2}\.\d{1,2}\.\d{4}/).required()
        })
    })
}
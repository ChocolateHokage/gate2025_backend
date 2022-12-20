import { projectModel, datesModel } from "../model/index.js";
import { ApiError, hasherIds } from "../module/index.js";
import { Sequelize } from 'sequelize';

export async function getObjectById(req, res, next) {
    try {
        const { date_id } = req.params

        const object = await datesModel.findOne({
            where: { id: hasherIds.decode(date_id) }
        })

        res.status(200).json({
            id: object.id,
            name: object.object_name,
            hours: object.hours,
            createdAt: object.createdAt,
            updatedAt: object.updatedAt
        })
    } catch (error) {
        next(error)
    }
}

export async function addObject(req, res, next) {
    try {
        const { name, hours } = req.body
        const { project_id } = req.params
        if (name.length > 255) {
            throw ApiError.BadRequest("Имя не должно превышать 255 символов")
        }
        const project = await projectModel.findOne({
            where: {
                id: hasherIds.decode(project_id)
            }
        })

        if (!project) {
            throw ApiError.NotFound("Нет такого проекта")
        }

        const date = await datesModel.findAll({
            where: {
                projectId: hasherIds.decode(project_id),
                object_name: name
            }
        })

        if (date.length > 0) {
            throw ApiError.BadRequest("Такой объект уже есть в этом проекте")
        }

        const object = await datesModel.create({
            projectId: hasherIds.decode(project.id),
            date: project.date,
            object_name: name,
            hours
        })

        res.status(201).json({
            id: object.id,
            name: object.object_name,
            hours: object.hours,
            updatedAt: object.updatedAt,
            createdAt: object.createdAt
        })
    } catch (error) {
        next(error)
    }
}

export async function updateObject(req, res, next) {
    try {
        const { date_id } = req.params
        const { name, hours } = req.body
        
        if (name.length > 255) {
            throw ApiError.BadRequest("Имя не должно превышать 255 символов")
        }

        const object = await datesModel.findOne({
            where: { id: hasherIds.decode(date_id) }
        })

        const duplObject = await datesModel.findAndCountAll({
            where: {
                object_name: name,
                projectId: hasherIds.decode(object.projectId)
            }
        })

        if ((duplObject.count > 0) && (duplObject.rows[0].id !== date_id)) {
            throw ApiError.BadRequest("Такой объект уже есть в этом проекте")
        }

        name && (object.object_name = name)
        if (hours >= 0) {
            (object.hours = hours)
        }
        await object.save()
        res.status(200).json({
            id: object.id,
            name: object.object_name,
            hours: object.hours,
            updatedAt: object.updatedAt,
            createdAt: object.createdAt
        })
    } catch (error) {
        next(error)
    }
}

export async function deleteObject(req, res, next) {
    try {
        const { date_id } = req.params

        const result = await datesModel.destroy({
            where: { id: hasherIds.decode(date_id) }
        })

        if (!result) {
            throw ApiError.BadRequest("Запись не найдена или уже удалена")
        }

        res.sendStatus(200)
    } catch (error) {
        next(error)
    }
}

export async function getObjectsByProjectId(req, res, next) {
    try {
        const { project_id } = req.params

        const _date = await datesModel.findAll({
            where: {
                projectId: hasherIds.decode(project_id),
            },
            include: [projectModel]
        })
        let result = []
        _date.map((object) => {
            result.push({
                id: object.id,
                name: object.object_name,
                project_name: object.project.name,
                hours: object.hours,
                updatedAt: object.updatedAt,
                createdAt: object.createdAt
            })
        })
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}
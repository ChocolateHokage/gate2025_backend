import { datesModel, projectModel } from "../model/index.js";
import { hasherIds, ApiError } from "../module/index.js";
import { Op } from "sequelize";


export async function getProjects(req, res, next) {
    try {
        const { dateFrom, dateTo } = req.query

        const projects = await projectModel.findAll({
            where: {
                date: {
                    [Op.between]: [
                        dateFrom.split('.').reverse().join('-'),
                        dateTo.split('.').reverse().join('-')
                    ]
                }
            },
        })

        const projectsDates = []
        projects.map((el) => {
            projectsDates.push(el.date)
        })

        const datesSorted = projectsDates.filter((item, index) => {
            return projectsDates.indexOf(item) === index
        })

        const days = []

        datesSorted.forEach(el => {
            days.push({
                date: el,
                projects_count: 0,
                hours_count: 0
            })
        })

        for (let i = 0; i < days.length; i++) {
            const day = days[i];
            const projectsCount = await projectModel.findAndCountAll({
                where: {
                    date: day.date
                }
            })
            const projectIds = []
            projectsCount.rows.map(el => {
                projectIds.push(hasherIds.decode(el.id)[0])
            })

            const dates = await datesModel.findAll({
                where: {
                    projectId: {
                        [Op.in]: projectIds
                    }
                }
            })
            days[i].projects_count = projectsCount.count
            dates.map(el => {
                days[i].hours_count += el.hours
            })
        }
        res.status(200).json(days)
    } catch (error) {
        next(error)
    }
}

export async function getProjectsByDate(req, res, next) {
    try {
        const { date } = req.params
        const projects = await projectModel.findAll({
            where: {
                date: date.split('.').reverse().join("-")
            },
        })
        res.status(projects.length ? 200 : 204).json(projects)
    } catch (error) {
        next(error)
    }
}

export async function addProject(req, res, next) {
    try {
        const { name, date } = req.body

        if (name.length > 255) {
            throw ApiError.BadRequest("Имя не должно превышать 255 символов")
        }

        const project = await projectModel.findOrCreate({
            where: {
                name,
                date: date.split(".").reverse().join("-")
            }, defaults: {
                name,
                date: date.split('.').reverse().join("-")
            }
        })

        res.status(project[1] ? 201 : 200).json(project[0])
    } catch (error) {
        next(error)
    }
}
export async function updateProject(req, res, next) {
    try {
        const { name } = req.body
        const { project_id } = req.params

        if (name.length > 255) {
            throw ApiError.BadRequest("Имя не должно превышать 255 символов")
        }

        const project = await projectModel.findOne({
            where: { id: hasherIds.decode(project_id) }
        })
        name && (project.name = name)

        await project.save()

        res.status(200).json(project)
    } catch (error) {
        next(error)
    }
}

export async function deleteProject(req, res, next) {
    try {
        const { project_id } = req.params

        const result = await projectModel.destroy({
            where: {
                id: hasherIds.decode(project_id)
            }
        })
        if (!result) {
            throw ApiError.BadRequest("Запись не найдена или уже удалена")
        }

        res.sendStatus(200)
    } catch (error) {
        next(error)
    }
}


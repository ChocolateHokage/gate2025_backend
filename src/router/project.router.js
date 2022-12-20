import { Router } from "express";

import { addProject, updateProject, deleteProject, getProjects, getProjectsByDate } from "../controller/project.controller.js";
import { addObject, getObjectsByProjectId } from '../controller/object.controller.js';

import { checkAuth, checkAccess } from "../module/index.js";
import { projectValidator, objectValidator } from "../validators/index.js"

const projectRouter = Router()

projectRouter.route("/")
    .get(checkAuth, projectValidator.getProjects, getProjects)
    .post(checkAuth, projectValidator.addProject, addProject)
projectRouter.route("/:project_id")
    .put(checkAuth, checkAccess, projectValidator.updateProject, updateProject)
    .delete(checkAuth, checkAccess, projectValidator.deleteProject, deleteProject)
projectRouter.route("/:project_id/objects")
    .get(checkAuth, projectValidator.getObjectByProjectId, getObjectsByProjectId)
    .post(checkAuth, objectValidator.addObject, addObject)
projectRouter.route("/:date")
    .get(checkAuth, projectValidator.getProjectsByDate, getProjectsByDate)
export default projectRouter
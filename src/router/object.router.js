import { Router } from "express";
import { updateObject, getObjectById, deleteObject } from '../controller/object.controller.js';

import { checkAuth, checkAccess } from "../module/index.js";
import { objectValidator } from "../validators/index.js";
const objectRouter = Router()

objectRouter.route("/:date_id")
    .get(checkAuth, objectValidator.getObjectById, getObjectById)
    .put(checkAuth, checkAccess, objectValidator.updateObject, updateObject)
    .delete(checkAuth, checkAccess, objectValidator.deleteObject, deleteObject)

export default objectRouter
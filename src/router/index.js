import { Router } from "express";
import accountRouter from "./account.router.js";
import projectRouter from "./project.router.js";
import objectRouter from "./object.router.js";

const router = Router();

router.use("/", accountRouter);
router.use('/projects', projectRouter);
router.use("/objects", objectRouter)

export default router;

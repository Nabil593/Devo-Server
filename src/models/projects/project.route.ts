import { Router } from "express";
import { createProject, getMyProjects, getProject, getSingleProject } from "./project.controller.js";

const router = Router();

router.post("/", createProject);
router.get("/", getProject);
router.get("/my-projects", getMyProjects);
router.get("/:id", getSingleProject);

export default router;
import { Router } from "express";
import { createProject, DeleteMyProjects, EditMyProjects, getMyProjects, getProject, getSingleProject } from "./project.controller.js";

const router = Router();

router.post("/", createProject);
router.get("/", getProject);
router.get("/my-projects", getMyProjects);
router.get("/:id", getSingleProject);
router.delete("/my-projects/:id", DeleteMyProjects);
router.patch("/my-projects/edit/:id", EditMyProjects);

export default router;
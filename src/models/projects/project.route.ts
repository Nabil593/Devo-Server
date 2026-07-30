import { Router } from "express";
import { createProject, getProject, getSingleProject } from "./project.controller.js";

const router = Router();

router.post("/", createProject);
router.get("/", getProject);
router.get("/:id", getSingleProject);

export default router;
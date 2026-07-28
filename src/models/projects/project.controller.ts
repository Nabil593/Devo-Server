import { Request, Response } from "express";
import { createNewProject } from "./project.service";

export const createProject = async(req: Request, res: Response): Promise<void> => {
    try {
        const projectData = req.body;
        const result = createNewProject(projectData)

    res.status(201).json({
      success: true,
      message: "Project added successfully!",
      data: result,
    });
    } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to add project",
      error: error.message,
    });
    }
}
import { Request, Response } from "express";
import { createNewProject, getAllProjectsService, getMyProjectsService, getSingleDetails } from "./project.service";

// Create New Project
export const createProject = async(req: Request, res: Response): Promise<void> => {
    try {
        const projectData = req.body;
        const result = await createNewProject(projectData);

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

// Get All Projects
export const getProject = async (req: Request, res: Response) => {
  try {
    const { search, category, sortDate } = req.query;

    const projects = await getAllProjectsService(
      search as string,
      category as string,
      sortDate as string
    );

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
      error: error.message,
    });
  }
};

// Get Single Project Details
export const getSingleProject = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id as string;

    const singleProject = await getSingleDetails(projectId);

    if (!singleProject) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.status(200).json({ success: true, project: singleProject });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Get My Projects
export const getMyProjects = async (req: Request, res: Response) => {
  try {
    const userEmail = req.query.email as string;
  
  if(!userEmail) {
    return res.status(400).json({ success: false, message: "User email is required"});
  }
  const myProjects = await getMyProjectsService(userEmail as string);
  res.status(200).json({ 
    success: true, 
    count: myProjects.length, 
    data: myProjects
  });

  } catch (error: any) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
}
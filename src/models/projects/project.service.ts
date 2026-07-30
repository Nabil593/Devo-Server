import { ObjectId } from "mongodb";
import { connectDB } from "../../config/db"
import { IProject } from "./project.interface";

// Create New project
export const createNewProject = async (projectData: any) => {
    const db = await connectDB();
    const collection = db.collection<IProject>('projects');

    const newProject = {
        ...projectData,
        createdAt: new Date()
    }

    const result = await collection.insertOne(newProject);
    return result;
}



// Get all Projects
export const getAllProjectsService = async (
  search?: string, 
  category?: string, 
  sortDate?: string
) => {
  const db = await connectDB();
  const collection = db.collection<IProject>("projects");

  let query: any = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { tags: { $regex: search, $options: "i" } },
    ];
  }

  if (category && category !== "All") {
    query.category = category;
  }

  let sortOption: any = { createdAt: -1 }; 
  if (sortDate === "oldest") {
    sortOption = { createdAt: 1 };
  }

  return await collection.find(query).sort(sortOption).toArray();
};


// Get Single Project
export const getSingleDetails = async (projectId: string) => {
    const db = await connectDB();
    const collection = db.collection<IProject>('projects');

    const query = { _id: new ObjectId(projectId) };
    return await collection.findOne(query);
}
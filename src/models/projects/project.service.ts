import { connectDB } from "../../config/db"
import { IProject } from "./project.interface";

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
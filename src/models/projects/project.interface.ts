import { ObjectId } from "mongodb";

export interface IProject {
  _id: ObjectId;
  title: string;
  description: string;
  techStack: string[];
  category: string;
  liveLink?: string;
  githubLink?: string;
  createdAt: Date;
}
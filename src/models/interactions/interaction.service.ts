import { ObjectId } from "mongodb";
import { connectDB } from "../../config/db";
import { IInteraction } from "./interaction.interface";
import { IProject } from "../projects/project.interface";

export const toggleVotService = async (projectId: string, userEmail: string) => {
  const db = await connectDB();
  const projectsCollection = db.collection<IProject>("projects");
  const interactionsCollection = db.collection<IInteraction>("interactions");

  const query = { projectId, userEmail };

  const existingVote = await interactionsCollection.findOne(query);

  if (existingVote) {
    await interactionsCollection.deleteOne(query);

    const updatedProject = await projectsCollection.findOneAndUpdate(
      { _id: new ObjectId(projectId) },
      { $inc: { upvotesCount: -1 } },
      { returnDocument: "after" }
    );

    return {hasVoted: false, project: updatedProject}

  } else {
    await interactionsCollection.insertOne({
        projectId,
        userEmail,
        createdAt: new Date(),
    })

    const updatedProject = await projectsCollection.findOneAndUpdate(
      { _id: new ObjectId(projectId) },
      { $inc: { upvotesCount: 1 } },
      { returnDocument: "after" }
    );

    return {hasVoted: true, project: updatedProject}
  }
};

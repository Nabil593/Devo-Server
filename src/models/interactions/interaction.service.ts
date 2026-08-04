import { ObjectId } from "mongodb";
import { connectDB } from "../../config/db";
import { IInteractionComment, IInteractionVote } from "./interaction.interface";
import { IProject } from "../projects/project.interface";

// Toggle Vote service
export const toggleVotService = async (projectId: string, userEmail: string) => {
  const db = await connectDB();
  const projectsCollection = db.collection<IProject>("projects");
  const interactionsCollection = db.collection<IInteractionVote>("Votes");

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



// Add Comment Service
export const addCommentService = async (projectId: string, userEmail: string, commentText: string, userName: string, userImage: string) => {
  const db = await connectDB();
  const interactionsCollection = db.collection<IInteractionComment>("Comments");

  const addComment = await interactionsCollection.insertOne({
    projectId,
    userEmail,
    userName,
    userImage,
    commentText,
    createdAt: new Date(),
  });

  const newComment = await interactionsCollection.findOne({ _id: addComment.insertedId });

  return newComment;
}

// Get Comments Service
export const getCommentsService = async (projectId: string) => {
  const db = await connectDB();
  const interactionsCollection = db.collection<IInteractionComment>("Comments");

  const comments = await interactionsCollection.find({ projectId }).toArray();
  return comments;
}


// Delete Comment Service
export const deleteCommentService = async (commentId: string) => {
  const db = await connectDB();
  const interactionsCollection = db.collection<IInteractionComment>("Comments");

  await interactionsCollection.deleteOne({ _id: new ObjectId(commentId) });

}


// Edit Comment Service
export const editCommentService = async (commentId: string, newcommentText: string) => {
  const db = await connectDB();
  const interactionsCollection = db.collection<IInteractionComment>("Comments");

  const updateComment = await interactionsCollection.findOneAndUpdate(
    { _id: new ObjectId(commentId) },
    { $set: { commentText: newcommentText } },
    { returnDocument: "after" }
  );

  return updateComment;
}
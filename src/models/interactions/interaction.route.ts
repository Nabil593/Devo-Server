import { Router } from "express";
import { handleCommentController, handleDeleteCommentController, handleEditCommentController, handleGetComments, handleGetUSerComments, handleGetUSerVotes, handleVotcontroller } from "./interaction.controller";

const interactionRouter = Router();

interactionRouter.post("/vote", handleVotcontroller);
interactionRouter.post("/comment", handleCommentController);
interactionRouter.get("/comment", handleGetComments);
interactionRouter.get("/comment/user", handleGetUSerComments);
interactionRouter.get("/vote/user", handleGetUSerVotes);
interactionRouter.delete("/comment/:commentId", handleDeleteCommentController);
interactionRouter.patch("/comment/edit/:commentId", handleEditCommentController);

export default interactionRouter;
import { Router } from "express";
import { handleCommentController, handleDeleteCommentController, handleEditCommentController, handleGetComments, handleVotcontroller } from "./interaction.controller";

const interactionRouter = Router();

interactionRouter.post("/vote", handleVotcontroller);
interactionRouter.post("/comment", handleCommentController);
interactionRouter.get("/comment", handleGetComments);
interactionRouter.delete("/comment/:commentId", handleDeleteCommentController);
interactionRouter.patch("/comment/edit/:commentId", handleEditCommentController);

export default interactionRouter;
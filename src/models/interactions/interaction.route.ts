import { Router } from "express";
import { handleCommentController, handleVotcontroller } from "./interaction.controller";

const interactionRouter = Router();

interactionRouter.post("/vote", handleVotcontroller);
interactionRouter.post("/comment", handleCommentController);

export default interactionRouter;
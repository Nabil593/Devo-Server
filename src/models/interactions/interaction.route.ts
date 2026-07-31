import { Router } from "express";
import { handleVotcontroller } from "./interaction.controller";

const interactionRouter = Router();

interactionRouter.post("/vote", handleVotcontroller);

export default interactionRouter;
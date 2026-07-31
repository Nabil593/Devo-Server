import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./models/projects/project.route";
import interactionRouter from "./models/interactions/interaction.route";

const app: Application =express();

// middlewsre
app.use(cors());
app.use(express.json());

// Connect Route
app.use("/api/projects", router);
app.use("/api/interactions", interactionRouter)

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running smoothly!");
});

export default app;
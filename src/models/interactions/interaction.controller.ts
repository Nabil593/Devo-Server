import { Request, Response } from "express"
import { addCommentService, toggleVotService } from "./interaction.service";

// Vote Controller
export const handleVotcontroller = async (req: Request, res: Response) => {
    try {

        const { projectId, userEmail } = req.body;

        if (!projectId || !userEmail) {
            return res.status(400).json({ success: false, message: "Project ID and User Email are required" });
        }

        const result = await toggleVotService(projectId, userEmail)

        res.status(200).json({
        success: true,
        hasVoted: result.hasVoted,
        project: result.project,
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}


// Add Comment Controller
export const handleCommentController = async (req: Request, res: Response) => {
    try {
        const { projectId, userEmail, commentText } = req.body;

        const result = await addCommentService(projectId, userEmail, commentText);

        res.status(200).json({
            success: true,
            message: "Comment added successfully",
            comment: result,
        })

    } catch (error: any) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}
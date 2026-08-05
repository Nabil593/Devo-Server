import { Request, Response } from "express"
import { addCommentService, deleteCommentService, editCommentService, getCommentsService, getUSerCommentService, GetUserVotesService, toggleVotService } from "./interaction.service";

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
        const { projectId, userEmail, commentText, userName,  userImage } = req.body;

        const result = await addCommentService(projectId, userEmail, commentText, userName, userImage);

        res.status(200).json({
            success: true,
            message: "Comment added successfully",
            comment: result,
        })

    } catch (error: any) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}



// Get Comments Controller
export const handleGetComments = async (req: Request, res: Response) => {
    try {
        const {projectId} = req.query;
        const comments = await getCommentsService(projectId as string);
        res.status(200).json({
            success: true,
            comments: comments,
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}



// Comment Delete Controller
export const handleDeleteCommentController = async (req: Request, res: Response) => {
    try {
        const { commentId } = req.params;

        if (!commentId) {
            return res.status(400).json({ success: false, message: "Comment ID is required" });
        }

        await deleteCommentService(commentId as string);

        res.status(200).json({
            success: true,
            message: "Comment deleted successfully",
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}



// Comment Edit Controller
export const handleEditCommentController = async (req: Request, res: Response) => {
    try {
        const { commentId } = req.params;
        const { commentText } = req.body;

        if(!commentId || !commentText) {
            return res.status(400).json({ success: false, message: "Comment ID and comment test are required" });
        }

        const updatedComment = await editCommentService(commentId as string, commentText as string);

        res.status(200).json({
            success: true,
            message: "Comment updated successfully",
            comment: updatedComment,
        });

    } catch (error: any) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}


// Get User Comments Controller
export const handleGetUSerComments = async (req: Request, res: Response) => {
    try {
        const { userEmail } = req.query;

        if(!userEmail) {
            return res.status(400).json({ success: false, message: "User email is required"});
        }

        const userComments = await getUSerCommentService(userEmail as string);

        res.status(200).json({
            success: true,
            comments: userComments,
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: "Server error", error: error.message })
    }
}


// Get User Votes Controller
export const handleGetUSerVotes = async (req:Request, res: Response) => {
    try {
        const { userEmail } = req.query;

        if(!userEmail) {
            return res.status(400).json({ success: false, message: "User email is required"});
        }

        const userVotes = await GetUserVotesService(userEmail as string);

        res.status(200).json({
            success: true,
            votes: userVotes,
        });

    } catch (error: any) {
        res.status(500).json({ success: false, message: "Server error", error: error.message })
    }
}
export interface IInteractionVote {
  projectId: string;
  userEmail: string;
  createdAt: Date;
}
export interface IInteractionComment {
  projectId: string;
  userEmail: string;
  commentText: string;
  createdAt: Date;
}
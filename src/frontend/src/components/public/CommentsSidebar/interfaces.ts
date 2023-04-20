export interface Comment {
  id: number;
  piaId: number;
  path: string;
  text: string;
  isResolved: boolean;
  createdByDisplayName: string;
  updatedAt: string;
  replies?: Comment[];
}

export default interface CommentSidebarProps {
  comments?: Comment[];
  piaId?: number;
  path: string;
}

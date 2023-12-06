import { IPiaForm } from '../../../types/interfaces/pia-form.interface';
import { PiaSections } from '../../../types/enums/pia-sections.enum';

export type Comment = {
  id: number;
  piaId: number;
  path: string;
  text: string;
  isResolved: boolean;
  isActive: boolean;
  createdByGuid: string;
  createdByDisplayName: string;
  updatedAt: string;
  replies?: CommentReply[];
};

export type CommentReply = {
  id: number;
  commentId: number;
  text: string;
  isResolved: boolean;
  isActive: boolean;
  createdByGuid: string;
  createdByDisplayName: string;
  updatedAt: string;
};

export default interface CommentSidebarProps {
  pia: IPiaForm;
  comments?: Comment[];
  piaId?: number;
  path: PiaSections | undefined;
  handleStatusChange: () => void;
}

import { PiaSections } from '../../../types/enums/pia-sections.enum';
import { Comment } from '../../public/CommentsSidebar/interfaces';
export default interface ViewCommentProps {
  comments?: Comment[];
  path: PiaSections | undefined;
  count?: number;
  onCommentClick: () => void;
}

export interface CommentCount {
  [path: string]: number;
}

import { PiaSections } from '../../../types/enums/pia-sections.enum';
import { Comment } from '../../public/CommentsSidebar/interfaces';
export default interface ViewCommentProps {
  comments?: Comment[];
  path: PiaSections | string | undefined;
  count?: number;
  disabled?: boolean;
}

export interface CommentCount {
  [path: string]: number;
}

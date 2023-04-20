import { Comment } from '../../public/CommentsSidebar/interfaces';
export default interface ViewCommentProps {
  comments?: Comment[];
  path: string;
  count: number;
}

export interface CommentCount {
  [path: string]: number;
}

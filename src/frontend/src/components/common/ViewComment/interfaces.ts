import { Comment } from '../../public/CommentsSidebar/interfaces';
export default interface ViewCommentProps {
  comments?: Comment[];
  path: string;
}

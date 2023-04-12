import { useState } from 'react';
import CommentSidebarProps from './interfaces';
import { formatDate } from '../../../utils/date';

const CommentSidebar = ({ comments }: CommentSidebarProps) => {
  const [newCommentContent, setNewCommentContent] = useState('');
  return (
    <div className="d-flex flex-column h-100">
      <h3 className="ps-3">Comments</h3>
      <div className="flex-grow-1 overflow-auto">
        {comments &&
          comments.map((comment) => (
            <div className="p-3" key={comment.id}>
              <div className="fw-bold">
                {comment.createdByDisplayName}
                <span className="ps-1 text-muted fw-normal">
                  {formatDate(comment.updatedAt)}
                </span>
              </div>
              <div>{comment.text}</div>
              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-3">
                  {comment.replies.map((reply) => (
                    <div className="p-2" key={reply.id}>
                      <div className="font-weight-bold">
                        {reply.createdByDisplayName}
                        <span className="ps-1 text-muted">
                          {formatDate(reply.updatedAt)}
                        </span>
                      </div>
                      <div>{reply.text}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        {comments.length === 0 && <div className="p-3">No comments yet.</div>}
      </div>
      {comments.length !== 0 && (
        <>
          <div className="d-flex flex-column p-3 gap-3">
            <input
              type="text"
              className="form-control mr-3"
              placeholder="Write a comment..."
              value={newCommentContent}
              onChange={(e) => setNewCommentContent(e.target.value)}
              aria-label="New comment text input"
            />
            <div
              className="d-flex gap-2 btn-group justify-content-end"
              role="group"
              aria-label="New comment button group"
            >
              <button
                type="button"
                className="bcgovbtn bcgovbtn__tertiary mr-2"
                onClick={() => setNewCommentContent('')}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bcgovbtn bcgovbtn__secondary"
                onClick={() => {}}
              >
                Add
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CommentSidebar;

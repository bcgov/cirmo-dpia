import { useState } from 'react';
import CommentSidebarProps from './interfaces';
import { formatDate } from '../../../utils/date';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CommentSidebar = ({ comments }: CommentSidebarProps) => {
  const [newCommentContent, setNewCommentContent] = useState('');
  return (
    <div className="d-flex flex-column h-100 overflow-y-auto">
      <h3 className="ps-3">Comments</h3>
      <div className="flex-grow-1">
        {comments &&
          comments?.map((comment) => (
            <div className="p-3" key={comment.id}>
              <div className="position-relative">
                <p className="fw-bold">
                  {comment.createdByDisplayName}
                  <span className="ps-1 text-muted fw-normal">
                    {formatDate(comment.updatedAt)}
                  </span>
                </p>
                <div className="d-flex mx-1 position-absolute top-0 start-100 translate-middle-x">
                  <button
                    className="mx-2 bcgovbtn bcgovbtn__tertiary"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded={false}
                  >
                    <FontAwesomeIcon icon={faEllipsisH} fontSize="large" />
                  </button>
                  <ul className="dropdown-menu border-1 shadow-sm">
                    <li role="button">
                      <button onClick={() => {}} className="dropdown-item">
                        Delete
                      </button>
                    </li>
                  </ul>
                </div>
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
        {!comments && (
          <p className="ms-3">
            Select &ldquo;View comments&rdquo; on any question to add comment or
            view comments.
          </p>
        )}
        {comments?.length === 0 && <p className="p-3">No comments yet.</p>}
      </div>
      {comments && (
        <>
          <div className="d-flex flex-column ms-3 mt-4 p-3 gap-3 border-top border-3 border-warning">
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

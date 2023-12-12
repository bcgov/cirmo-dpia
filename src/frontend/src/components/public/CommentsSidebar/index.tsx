import { useCallback, useEffect, useRef, useState } from 'react';
import CommentSidebarProps, { Comment } from './interfaces';
import { getDateTime, stringToDate } from '../../../utils/date';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { API_ROUTES } from '../../../constant/apiRoutes';
import { HttpRequest } from '../../../utils/http-request.util';
import Modal from '../../../components/common/Modal';
import Messages from './messages';
import { useLocation } from 'react-router-dom';
import { getGUID } from '../../../utils/user';
import { statusList } from '../../../utils/statusList/statusList';
const CommentSidebar = ({
  pia,
  piaId,
  path,
  handleStatusChange,
}: CommentSidebarProps) => {
  const { pathname } = useLocation();
  const [comments, setComments] = useState<Comment[]>([]);

  // Modal State
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalConfirmLabel, setModalConfirmLabel] = useState<string>('');
  const [modalCancelLabel, setModalCancelLabel] = useState<string>('');
  const [modalTitleText, setModalTitleText] = useState<string>('');
  const [modalParagraph, setModalParagraph] = useState<string>('');
  const [modalButtonValue, setModalButtonValue] = useState<string>('');

  // Delete comment and reply state
  const [deleteCommentId, setDeleteCommentId] = useState<number | null>(null);
  const [deleteCommentReplyId, setDeleteCommentReplyId] = useState<
    number | null
  >(null);

  // Enable comments
  const enableComments = pia.status
    ? statusList(pia)?.[pia.status]?.comments ?? false
    : false;

  // Ref for controlling auto scroll to latest comment
  const commentsEndRef = useRef<HTMLDivElement>(null);

  // ID of the comment that the user wants to reply to.
  // null when no comment is being replied to.
  const [replyCommentId, setReplyCommentId] = useState<number | null>(null);

  // New comment content
  const [newCommentContent, setNewCommentContent] = useState<string>('');
  const [newCommentReplyContent, setNewCommentReplyContent] =
    useState<string>('');

  // Focus and scroll into view the reply input
  useEffect(() => {
    const inputElement = document.getElementById('commentReplyInput');
    if (inputElement) {
      // Focus
      inputElement.focus();
      // Scroll into view
      inputElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [replyCommentId]);

  // Async callback for getting comments within a useEffect hook
  const getComments = useCallback(async () => {
    const commentArr: Comment[] = await HttpRequest.get(
      API_ROUTES.PIA_COMMENTS,
      {},
      {},
      true,
      {
        piaId: piaId,
        path: path,
      },
    );
    setComments(commentArr);
  }, [piaId, path]);

  // Fetch comments when pia ID or path changes
  useEffect(() => {
    try {
      getComments();
    } catch (err) {
      console.error(err);
    }
  }, [piaId, path, getComments]);

  // Delete comment
  const deleteComment = async (commentId: number) => {
    await HttpRequest.delete(
      API_ROUTES.DELETE_COMMENT.replace(':id', `${commentId}`),
      {},
      {},
      true,
    );
    getComments();
    handleStatusChange();
  };

  // Delete reply
  const deleteCommentReply = async (replyId: number) => {
    await HttpRequest.delete(
      API_ROUTES.DELETE_COMMENT_REPLY.replace(':id', `${replyId}`),
      {},
      {},
      true,
    );
    getComments();
    handleStatusChange();
  };

  // Add new comment
  const addComment = async () => {
    await HttpRequest.post(
      API_ROUTES.PIA_COMMENTS,
      { piaId: piaId, path: path, text: `${newCommentContent}` },
      {},
      {},
      true,
    );
    getComments();
    handleStatusChange();
  };

  // Add new reply
  const addCommentReply = async (commentId: number) => {
    await HttpRequest.post(
      API_ROUTES.COMMENT_REPLY,
      { commentId, text: `${newCommentReplyContent}` },
      {},
      {},
      true,
    );
    getComments();
    handleStatusChange();
  };

  // Clean comments state when page changes
  useEffect(() => {
    setComments([]);
  }, [pathname]);

  // Scroll latest comment into focus
  useEffect(() => {
    if (commentsEndRef.current) {
      const scrollHeight = commentsEndRef.current.scrollHeight;
      commentsEndRef.current.scrollTo({
        top: scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [comments]);

  // Modal close
  const handleModalClose = async (event: any) => {
    event.preventDefault();
    setShowModal(false);
    if (deleteCommentId) await deleteComment(deleteCommentId);
    if (deleteCommentReplyId) await deleteCommentReply(deleteCommentReplyId);
  };

  // Modal cancel
  const handleModalCancel = () => {
    setShowModal(false);
  };

  // Handle deleting comments
  const handleDeleteComment = (commentId: number) => {
    setModalConfirmLabel(Messages.Modal.Delete.ConfirmLabel.en);
    setModalCancelLabel(Messages.Modal.Delete.CancelLabel.en);
    setModalTitleText(Messages.Modal.Delete.TitleText.en);
    setModalParagraph(Messages.Modal.Delete.ParagraphText.en);
    setModalButtonValue('deleteComments');
    setDeleteCommentId(commentId);
    setShowModal(true);
  };

  // Handle deleting replies
  const handleDeleteCommentReply = (replyId: number) => {
    setModalConfirmLabel(Messages.Modal.Delete.ConfirmLabel.en);
    setModalCancelLabel(Messages.Modal.Delete.CancelLabel.en);
    setModalTitleText(Messages.Modal.Delete.TitleText.en);
    setModalParagraph(Messages.Modal.Delete.ParagraphText.en);
    setModalButtonValue('deleteComments');
    setDeleteCommentReplyId(replyId);
    setShowModal(true);
  };

  return (
    <>
      <div className="bg-white comment-sidebar">
        <h3 className="ps-3">Comments</h3>
        <div
          className="comment-sidebar__comments-container"
          ref={commentsEndRef}
        >
          {comments &&
            comments?.map((comment) => (
              <div className="p-3" key={comment.id} id="CommentSidebar">
                <div className="position-relative">
                  <p className="commentHeader fw-bold">
                    {comment.createdByDisplayName}
                    <span className="ps-1 pe-2 text-muted fw-normal">
                      {getDateTime(stringToDate(comment.updatedAt))}
                    </span>
                  </p>
                  {enableComments && (
                    <div className="commentActions">
                      <button
                        className="commentActionBtn bcgovbtn bcgovbtn__tertiary"
                        type="button"
                        aria-label="Comment Reply Button"
                        id="commentReplyBtn"
                        onClick={() => setReplyCommentId(comment.id)}
                      >
                        <b style={{ fontSize: 'small' }}>Reply</b>
                      </button>
                      <button
                        className="commentActionBtn bcgovbtn bcgovbtn__tertiary"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded={false}
                        aria-label="Comment Options Button"
                      >
                        <FontAwesomeIcon icon={faEllipsisH} fontSize="medium" />
                      </button>
                      <ul
                        aria-label="Comment Options Menu"
                        className="dropdown-menu border-1 shadow-sm"
                      >
                        <li role="button">
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="dropdown-item"
                            disabled={comment.createdByGuid !== getGUID()}
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <div id="CommentSidebarComment">
                  {comment.isActive ? (
                    comment.text
                  ) : (
                    <i>[this comment has been deleted]</i>
                  )}
                </div>

                {/* REPLIES */}
                <>
                  {comment.replies &&
                    comment.replies.length > 0 &&
                    comment.replies.map((reply) => (
                      <div className="commentReply" key={reply.id}>
                        <div className="vr" />
                        <div className="px-2">
                          <p className="commentHeader fw-bold">
                            {reply.createdByDisplayName}
                            <span className="ps-1 pe-2 text-muted fw-normal">
                              {getDateTime(stringToDate(reply.updatedAt))}
                            </span>
                          </p>
                          {enableComments && (
                            <div className="commentReplyActions">
                              <button
                                className="commentActionBtn bcgovbtn bcgovbtn__tertiary"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded={false}
                                aria-label="Comment Options Button"
                              >
                                <FontAwesomeIcon
                                  icon={faEllipsisH}
                                  fontSize="medium"
                                />
                              </button>
                              <ul
                                aria-label="Comment Options Menu"
                                className="dropdown-menu border-1 shadow-sm"
                              >
                                <li role="button">
                                  <button
                                    onClick={() =>
                                      handleDeleteCommentReply(reply.id)
                                    }
                                    className="dropdown-item"
                                    disabled={reply.createdByGuid !== getGUID()}
                                  >
                                    Delete
                                  </button>
                                </li>
                              </ul>
                            </div>
                          )}
                          <div id="CommentSidebarCommentReply">
                            {reply.isActive ? (
                              reply.text
                            ) : (
                              <i>[this comment has been deleted]</i>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                  {/* NEW REPLY INPUT */}
                  {replyCommentId === comment.id && enableComments && (
                    <div className="commentReply">
                      <div className="vr commentReplyInputDivider" />
                      <div className="d-flex flex-column ms-3 mt-auto gap-3 w-100 justify-self-end">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Write a reply..."
                          value={newCommentReplyContent}
                          onChange={(e) =>
                            setNewCommentReplyContent(e.target.value)
                          }
                          aria-label="Comment reply text input"
                          id="commentReplyInput"
                        />
                        <div
                          className="d-flex gap-2 btn-group justify-content-end"
                          role="group"
                          aria-label="Comment reply button group"
                        >
                          <button
                            type="button"
                            className="bcgovbtn bcgovbtn__tertiary mr-2"
                            onClick={() => {
                              setNewCommentReplyContent('');
                              setReplyCommentId(null);
                            }}
                            aria-label="Cancel Comment Reply Button"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="bcgovbtn bcgovbtn__secondary"
                            onClick={() => {
                              addCommentReply(comment.id);
                              setNewCommentReplyContent('');
                            }}
                            aria-label="Add New Comment Reply Button"
                            disabled={
                              (newCommentReplyContent || '').trim() === ''
                            }
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              </div>
            ))}
          {!path && (
            <p className="ms-3">
              Select &ldquo;View comments&rdquo; on any question to add comment
              or view comments.
            </p>
          )}
          {path && comments?.length === 0 && (
            <p className="p-3">No comments yet.</p>
          )}
        </div>

        {/* NEW COMMENT INPUT */}
        {enableComments && path && comments && (
          <div className="d-flex flex-column ms-3 pe-5 mt-auto gap-3 w-100 justify-self-end comment-sidebar__add-comment">
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
                aria-label="Cancel New Comment Button"
              >
                Cancel
              </button>
              <button
                type="button"
                className="bcgovbtn bcgovbtn__secondary"
                onClick={() => {
                  addComment();
                  setNewCommentContent('');
                }}
                aria-label="Add New Comment Button"
                disabled={(newCommentContent || '').trim() === ''}
              >
                Add
              </button>
            </div>
          </div>
        )}
      </div>
      <Modal
        confirmLabel={modalConfirmLabel}
        cancelLabel={modalCancelLabel}
        titleText={modalTitleText}
        show={showModal}
        value={modalButtonValue}
        handleClose={(e) => handleModalClose(e)}
        handleCancel={handleModalCancel}
      >
        <p className="modal-text">{modalParagraph}</p>
      </Modal>
    </>
  );
};

export default CommentSidebar;

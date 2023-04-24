import { useCallback, useEffect, useState } from 'react';
import CommentSidebarProps, { Comment } from './interfaces';
import { formatDate } from '../../../utils/date';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { API_ROUTES } from '../../../constant/apiRoutes';
import { HttpRequest } from '../../../utils/http-request.util';
import Modal from '../../../components/common/Modal';
import Messages from './messages';
import { useLocation } from 'react-router-dom';
import { AppStorage } from '../../../utils/storage';
const CommentSidebar = ({
  piaId,
  path,
  handleStatusChange,
}: CommentSidebarProps) => {
  const { pathname } = useLocation();
  const [comments, setComments] = useState<Comment[]>([]);
  const [deleteCommentId, setDeleteCommentId] = useState<number>(0);
  //
  // Modal State
  //
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalConfirmLabel, setModalConfirmLabel] = useState<string>('');
  const [modalCancelLabel, setModalCancelLabel] = useState<string>('');
  const [modalTitleText, setModalTitleText] = useState<string>('');
  const [modalParagraph, setModalParagraph] = useState<string>('');
  const [modalButtonValue, setModalButtonValue] = useState<string>('');
  /**
   * Async callback for getting comments within a useEffect hook
   */
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

  useEffect(() => {
    setComments([]);
  }, [pathname]);

  const handleModalClose = async (event: any) => {
    event.preventDefault();
    setShowModal(false);
    await deleteComment(deleteCommentId);
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  const [newCommentContent, setNewCommentContent] = useState('');

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

  const loginUserName = AppStorage.getItem<string>('username');

  const handleDeleteComment = (commentId: number) => {
    setModalConfirmLabel(Messages.Modal.Delete.ConfirmLabel.en);
    setModalCancelLabel(Messages.Modal.Delete.CancelLabel.en);
    setModalTitleText(Messages.Modal.Delete.TitleText.en);
    setModalParagraph(Messages.Modal.Delete.ParagraphText.en);
    setModalButtonValue('deleteComments');
    setDeleteCommentId(commentId);
    setShowModal(true);
  };

  useEffect(() => {
    try {
      getComments();
    } catch (err) {
      console.error(err);
    }
  }, [piaId, path, getComments]);

  return (
    <div className="d-flex flex-column justify-content-end bg-white overflow-y-auto position-relative">
      <h3 className="ps-3">Comments</h3>
      <div className="flex-grow-1 mb-5">
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
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="dropdown-item"
                        disabled={
                          comment.createdByDisplayName !== loginUserName
                        }
                      >
                        Delete
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                {comment.isActive ? (
                  comment.text
                ) : (
                  <i>[this comment has been deleted]</i>
                )}
              </div>
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
        {!path && (
          <p className="ms-3">
            Select &ldquo;View comments&rdquo; on any question to add comment or
            view comments.
          </p>
        )}
        {path && comments?.length === 0 && (
          <p className="p-3">No comments yet.</p>
        )}
      </div>
      {path && comments && (
        <>
          <div className="d-flex flex-column ms-3 mt-auto p-3 gap-3 border-top border-3 border-warning w-100 justify-self-end">
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
                onClick={() => {
                  addComment();
                  setNewCommentContent('');
                }}
              >
                Add
              </button>
            </div>
          </div>
        </>
      )}
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
    </div>
  );
};

export default CommentSidebar;

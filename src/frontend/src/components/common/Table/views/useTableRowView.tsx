import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InputText from '../../InputText/InputText';
import { TableViewProps } from './table-view-props.interface';
import { TextInputEnum } from '../../../../constant/constant';
import ViewComments from '../../../../components/common/ViewComment';
import { PiaSections } from '../../../../types/enums/pia-sections.enum';
import Modal from '../../../../components/common/Modal';
import { useState } from 'react';
import Messages from './messages';
import { API_ROUTES } from '../../../../constant/apiRoutes';
import { HttpRequest } from '../../../../utils/http-request.util';

type UseTableRowViewProps = TableViewProps;

export const UseTableRowView = (props: UseTableRowViewProps) => {
  // State variables to manage the delete modal and its content
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [modalConfirmLabel, setModalConfirmLabel] = useState<string>('');
  const [modalCancelLabel, setModalCancelLabel] = useState<string>('');
  const [modalTitleText, setModalTitleText] = useState<string>('');
  const [modalParagraph, setModalParagraph] = useState<string>('');
  const [modalButtonValue, setModalButtonValue] = useState<string>('');
  const [deleteCommentPath, setDeleteCommentPath] = useState<string>('');

  // Function to delete comments based on the provided path
  const deleteCommentsByPath = async (path: PiaSections | string) => {
    // Make a DELETE request to the backend API to delete comments based on the path

    await HttpRequest.delete(
      API_ROUTES.DELETE_COMMENTS_BY_PATH.replace(':path', `${path}`),
      {},
      {},
      true,
    );
  };

  // Function to handle closing the modal
  const handleModalClose = async (event: any) => {
    event.preventDefault();
    setShowDeleteModal(false);
    // Initiate the deletion of comments associated with the specified path
    await deleteCommentsByPath(deleteCommentPath);
  };

  // Function to handle canceling the modal
  const handleModalCancel = async (event: any) => {
    event?.preventDefault();
    setShowDeleteModal(false);
  };

  // Function to initiate the deletion of a step along with its comments
  const handleDeleteStepwithComments = async (path: PiaSections | string) => {
    setModalConfirmLabel(Messages.Modal.Delete.ConfirmLabel.en);
    setModalCancelLabel(Messages.Modal.Delete.CancelLabel.en);
    setModalTitleText(Messages.Modal.Delete.TitleText.en);
    setModalParagraph(Messages.Modal.Delete.ParagraphText.en);
    setShowDeleteModal(true);
    setModalButtonValue('deleteStepwithComments');
    setDeleteCommentPath(path);
    // Show the delete modal
    setShowDeleteModal(true);
  };

  return (
    <>
      {props.data.map((rowData, index) => (
        <div key={index} className="data-row">
          {/* Numbered Label */}
          {props.numberedLabelPrefix && (
            <h4>
              {props.numberedLabelPrefix} {index + 1}
            </h4>
          )}

          {/* Columns */}
          {props.columnsMeta.map((column) => (
            <div key={column.key + '-' + index} className={column.className}>
              {/* Readonly */}
              {props.readOnly && column.key !== 'uid' && (
                <>
                  <p className="fw-bold mb-0">{column.label}</p>
                  <p>{rowData[column.key] || <i>Not answered</i>}</p>
                </>
              )}

              {/* Input Text */}
              {!props.readOnly && (
                <InputText
                  type={column.type ? column.type : TextInputEnum.INPUT_TEXT}
                  value={rowData[column.key]}
                  labelSide="top"
                  label={column.label}
                  isDisabled={column.isDisable}
                  onChange={(e) =>
                    props.handleDataChange(e, `${index}.${column.key}`)
                  }
                />
              )}
            </div>
          ))}

          {props.showComments ? (
            <ViewComments
              count={
                props.commentCount?.[
                  PiaSections.COLLECTION_USE_AND_DISCLOSURE_STEPS +
                    '-' +
                    rowData.uid
                ]
              }
              path={
                PiaSections.COLLECTION_USE_AND_DISCLOSURE_STEPS +
                '-' +
                rowData.uid
              }
            />
          ) : (
            ''
          )}

          {/* Delete row */}
          {props.allowRowDelete && !props.readOnly && (
            <div
              className="mt-4 d-flex justify-content-end"
              id="delete-row-button"
            >
              <button
                className="bcgovbtn bcgovbtn__tertiary bold min-gap delete__btn"
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteStepwithComments(
                    PiaSections.COLLECTION_USE_AND_DISCLOSURE_STEPS +
                      '-' +
                      rowData.uid,
                  );
                  props.removeRow(index);
                }}
                aria-label="Delete row button"
              >
                Delete
                <FontAwesomeIcon className="ms-1" icon={faTrash} />
              </button>
            </div>
          )}
        </div>
      ))}

      {/* Add new rows */}
      {props.allowRowAdd && !props.readOnly && (
        <div className="d-flex justify-content-center" id="add-row-button">
          <button
            onClick={(e) => {
              e.preventDefault();
              props.addEmptyRow();
            }}
            aria-label={props.addRowBtnLabel ?? 'Add more risks'}
            className="bcgovbtn bcgovbtn__tertiary bold min-gap"
          >
            {props.addRowBtnLabel}
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      )}
      {/* Rendering a Delete Modal component*/}
      <Modal
        confirmLabel={modalConfirmLabel}
        cancelLabel={modalCancelLabel}
        titleText={modalTitleText}
        show={showDeleteModal}
        value={modalButtonValue}
        handleClose={(e) => handleModalClose(e)}
        handleCancel={handleModalCancel}
      >
        <p className="modal-text">{modalParagraph}</p>
      </Modal>
    </>
  );
};

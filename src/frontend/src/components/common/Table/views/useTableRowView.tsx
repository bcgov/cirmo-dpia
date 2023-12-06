import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InputText from '../../InputText/InputText';
import { TableViewProps } from './table-view-props.interface';
import { TextInputEnum } from '../../../../constant/constant';
import ViewComments from '../../../../components/common/ViewComment';
import { PiaSections } from '../../../../types/enums/pia-sections.enum';
import { generateUID } from '../../../../utils/generateUID';
type UseTableRowViewProps = TableViewProps;

export const UseTableRowView = (props: UseTableRowViewProps) => {
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
              {props.readOnly && (
                <>
                  <p className="fw-bold mb-0">{column.label}</p>
                  <p>{rowData[column.key] || <i>Not answered</i>}</p>
                </>
              )}

              {/* Input Text */}
              {!props.readOnly && (
                <InputText
                  type={column.type ? column.type : TextInputEnum.INPUT_TEXT}
                  value={
                    rowData[column.key] ||
                    (column.key == 'uid'
                      ? (rowData[column.key] = generateUID())
                      : '')
                  }
                  labelSide="top"
                  label={
                    PiaSections.COLLECTION_USE_AND_DISCLOSURE_STEPS +
                    '-' +
                    (index + 1) +
                    '-' +
                    rowData.uid
                  }
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
    </>
  );
};

import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InputText from '../../InputText/InputText';
import { TableViewProps } from './table-view-props.interface';
import { TextInputEnum } from '../../../../constant/constant';

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

          {/* Delete row */}
          {props.allowRowDelete && !props.readOnly && (
            <div className="mt-4 d-flex justify-content-end">
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
        <div className="d-flex justify-content-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              props.addEmptyRow();
            }}
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

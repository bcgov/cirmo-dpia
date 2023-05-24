import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InputText from '../../InputText/InputText';
import { TableViewProps } from './table-view-props.interface';

type UseTableStandardViewProps = TableViewProps;

export const UseTableStandardView = (props: UseTableStandardViewProps) => {
  return (
    <>
      <table className="table data-table">
        {props.columnsMeta.length > 0 && (
          <>
            <thead>
              <tr>
                {props.columnsMeta.map((column) => (
                  <th
                    scope="col"
                    key={column.key}
                    className={column?.className || ''}
                  >
                    {column.label}
                    {column.hint && (
                      <div className={'no-bold'}>{column.hint}</div>
                    )}
                  </th>
                ))}
                <th />
              </tr>
            </thead>

            <tbody>
              {props.data?.map((rowData, index) => (
                <tr key={index}>
                  {props.columnsMeta.map((column) => (
                    <td
                      key={column.key + '-' + index}
                      className={column.className || ''}
                    >
                      {!props.readOnly ? (
                        <InputText
                          type="text"
                          value={rowData?.[column.key]}
                          labelSide="left"
                          label={
                            props.numberedLabelPrefix &&
                            `${props.numberedLabelPrefix} ${index + 1}`
                          }
                          isDisabled={column.isDisable}
                          onChange={(e) =>
                            props.handleDataChange(e, `${index}.${column.key}`)
                          }
                        />
                      ) : (
                        <p>
                          {props.numberedLabelPrefix && (
                            <label>
                              {props.numberedLabelPrefix} {index + 1}
                            </label>
                          )}
                          {rowData?.[column.key]}
                        </p>
                      )}
                    </td>
                  ))}

                  {props.allowRowDelete && !props.readOnly && (
                    <td key={'action' + '-' + index}>
                      <button
                        className=" form-control btn btn-outline-danger"
                        onClick={(e) => {
                          e.preventDefault();
                          props.removeRow(index);
                        }}
                        aria-label="Delete row button"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </>
        )}
      </table>

      {props.allowRowAdd && (
        <div className="pt-4 pb-4 view-pid">
          {!props.readOnly && (
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
          )}
        </div>
      )}
    </>
  );
};

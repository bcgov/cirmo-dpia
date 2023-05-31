import { useNavigate } from 'react-router-dom';
import { dateToString } from '../../../utils/date';
import { statusList } from '../../../utils/status';
import TableOrdering from './TableOrdering';
import { IDataTable } from './interface';
import { routes } from '../../../constant/routes';
import { buildDynamicPath } from '../../../utils/path';

const PIAListTable = ({ headings, pias, sorting }: IDataTable) => {
  const navigate = useNavigate();

  const onTitleClick = (piaId?: number) => {
    if (!piaId) return;

    navigate(
      buildDynamicPath(routes.PIA_INTAKE_VIEW, {
        id: piaId,
      }),
    );
  };

  return (
    <div className="component__wrapper data-table__container">
      <table className="table data-table">
        <thead>
          <tr>
            {Object.keys(headings).map((heading: string) => (
              <th
                key={heading}
                aria-label={headings[heading].title}
                scope="col"
                className={` ${
                  headings[heading].sorting ? ' enableSorting' : ''
                } ${
                  headings[heading].hideOnSmView
                    ? ' d-none d-md-table-cell'
                    : ''
                }`}
                onClick={() => sorting(heading)}
              >
                {headings[heading].title}
                {headings[heading].sorting ? (
                  <TableOrdering
                    currentState={headings[heading].sortValue}
                    title={headings[heading].title}
                  ></TableOrdering>
                ) : (
                  ''
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pias.map((pia, index) => (
            <tr key={index}>
              <td
                tabIndex={0}
                className="clickable"
                onClick={() => onTitleClick(pia.id)}
                onKeyDown={(event) => {
                  if (event.code === 'Enter') {
                    event.preventDefault();
                    onTitleClick(pia.id);
                  }
                }}
              >
                {pia.title}
              </td>
              <td>{dateToString(pia.updatedAt)}</td>
              <td className="d-none d-md-table-cell">{pia.drafterName}</td>
              <td>
                {pia.status ? (
                  pia.status in statusList ? (
                    <div
                      className={`statusBlock ${statusList[pia.status].class}`}
                    >
                      {statusList[pia.status].title}
                    </div>
                  ) : (
                    ''
                  )
                ) : (
                  ''
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PIAListTable;

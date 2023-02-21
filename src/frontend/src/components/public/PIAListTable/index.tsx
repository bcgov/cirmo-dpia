import { Link } from 'react-router-dom';
import { dateToString } from '../../../utils/date';
import { statusList } from '../../../utils/status';
import TableOrdering from './TableOrdering';
import { IDataTable } from './interface';
import { routes } from '../../../constant/routes';
import { buildDynamicPath } from '../../../utils/path';

const PIAListTable = ({ headings, pias, sorting }: IDataTable) => {
  return (
    <div className="component__wrapper data-table__container">
      <table className="table data-table">
        <thead>
          <tr>
            {Object.keys(headings).map((heading: string) => (
              <th
                key={heading}
                className={` ${
                  headings[heading].sorting ? 'enableSorting' : ''
                }`}
                onClick={() => sorting(heading)}
              >
                {headings[heading].title}
                {headings[heading].sorting ? (
                  <TableOrdering
                    currentState={headings[heading].sortValue}
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
              <td>{pia.title}</td>
              <td>{dateToString(pia.updatedAt)}</td>
              <td>{pia.drafterName}</td>
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
              <td>
                {pia.id && (
                  <Link
                    className="bcgovbtn bcgovbtn__tertiary"
                    target="_blank"
                    rel="noopener noreferrer"
                    to={buildDynamicPath(routes.PIA_VIEW, {
                      id: pia.id,
                      title: pia.title || '',
                    })}
                  >
                    View Details
                  </Link>
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

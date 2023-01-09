import { Link } from 'react-router-dom';
import { dateToString } from '../../../utils/date';
import { statusList } from '../../../utils/status';

import { IDataTable } from './interface';

const PIAListTable = ({ headings, pias }: IDataTable) => {
  return (
    <div className="component__wrapper data-table__container">
      <table className="table data-table">
        <thead>
          <tr>
            {headings.map((heading) => (
              <th key={heading}>{heading}</th>
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
                <div className={`statusBlock ${pia.status ? statusList[pia.status].class : ''}`}>
                  { pia.status ? statusList[pia.status].title: "" }
                </div>
              
              </td>
              <td>
                <Link
                  className="bcgovbtn bcgovbtn__tertiary"
                  target="_blank"
                  rel="noopener noreferrer"
                  to={`/pia/intake/${pia.id}/${pia.title}`}
                >
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PIAListTable;

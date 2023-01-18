import { Link } from 'react-router-dom';
import { dateToString } from '../../../utils/date';
import { statusList } from '../../../utils/status';
import TableOrdering from './TableOrdering';
import { IDataTable } from './interface';
import { useEffect, useState } from 'react';
import { PiaSorting } from '../../../constant/constant';

const PIAListTable = ({ headings, pias }: IDataTable) => {
  const [LastModifiedOrder, setLastModifiedOrder] = useState(0);
  const [DrafterOrder, setDrafterOrder] = useState(0);
  useEffect(() => {
    (async () => {})();
  }, [LastModifiedOrder, DrafterOrder]);

  //toggle button states
  function startSorting(Sortheading: string): number {
    console.log('startSorting');
    switch (headings[Sortheading].title) {
      case 'Last modified':
        headings[Sortheading].sortValue =
          LastModifiedOrder >= PiaSorting.DESCENDING
            ? PiaSorting.INACTIVE
            : LastModifiedOrder + 1;
        setLastModifiedOrder(headings[Sortheading].sortValue);
        return LastModifiedOrder;
      case 'Drafter':
        headings[Sortheading].sortValue =
          DrafterOrder >= PiaSorting.DESCENDING
            ? PiaSorting.INACTIVE
            : DrafterOrder + 1;
        setDrafterOrder(headings[Sortheading].sortValue);
        return DrafterOrder;
      default:
        return 0;
    }
  }

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
                onClick={() => startSorting(heading)}
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
                      className={`statusBlock ${
                        pia.status ? statusList[pia.status].class : ''
                      }`}
                    >
                      {pia.status ? statusList[pia.status].title : ''}
                    </div>
                  ) : (
                    ''
                  )
                ) : (
                  ''
                )}
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

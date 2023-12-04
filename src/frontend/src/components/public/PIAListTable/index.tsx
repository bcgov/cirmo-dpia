import { useNavigate } from 'react-router-dom';
import { dateToString } from '../../../utils/date';
import { statusList } from '../../../utils/statusList/statusList';
import TableOrdering from './TableOrdering';
import { IDataTable } from './interface';
import { routes } from '../../../constant/routes';
import { buildDynamicPath } from '../../../utils/path';
import TooltipMeesage from '../../common/Tooltip/messages';
import { Tooltip } from '../../common/Tooltip/index';

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
  const showIcon = true; // Define a boolean variable here to control the icon
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
                {' '}
                {/* render with the Tooltip component if the heading is 'PIA status' */}
                {headings[heading].title === 'PIA status' ? (
                  <>
                    {headings[heading].title}
                    <Tooltip
                      label={headings[heading].title}
                      content={
                        <div>{TooltipMeesage.PIAStatus.tooltipText}</div>
                      }
                      direction="bottom"
                      showIcon={showIcon}
                    />
                  </>
                ) : (
                  headings[heading].title
                )}
                {headings[heading].sorting ? (
                  <TableOrdering
                    heading={heading}
                    currentState={headings[heading].sortValue}
                    title={headings[heading].title}
                    sorting={sorting}
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
              >
                {pia.title}
              </td>
              <td>{dateToString(pia.updatedAt)}</td>
              <td className="d-none d-md-table-cell">{pia.drafterName}</td>
              <td>
                {pia.status ? (
                  pia.status in statusList(null) ? (
                    <div
                      className={`statusBlock ${
                        statusList(null)[pia.status].class
                      }`}
                    >
                      {statusList(null)[pia.status].title}
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

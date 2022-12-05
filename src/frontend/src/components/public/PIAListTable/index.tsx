import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IDataTable } from './interface';

const PIAListTable = ({ headings, pias }: IDataTable) => {
  const handleDownload = () => {};

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
              <td>{pia.updatedAt}</td>
              <td>{pia.drafter}</td>
              <td className="data-table__status">{pia.status}</td>
              <td>
                <button
                  className="bcgovbtn bcgovbtn__tertiary"
                  onClick={handleDownload}
                >
                  Download PIA
                  <FontAwesomeIcon className="icon" icon={faFileDownload} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PIAListTable;

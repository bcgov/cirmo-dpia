import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { API_ROUTES } from '../../../constant/apiRoutes';
import { dateToString } from '../../../utils/date';
import {
  FileDownload,
  FileDownloadTypeEnum,
} from '../../../utils/file-download.util';
import { IDataTable } from './interface';

const PIAListTable = ({ headings, pias }: IDataTable) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState('');
  const handleDownload = async (id: number | undefined) => {
    setDownloadError('');

    if (!id) {
      console.error(
        'Something went wrong. Result Id not available for download',
      );
      setDownloadError('Something went wrong. Please try again.');
      return;
    }

    setIsDownloading(true);
    try {
      await FileDownload.download(
        API_ROUTES.PIA_INTAKE_RESULT_DOWNLOAD.replace(':id', `${id}`),
        FileDownloadTypeEnum.PDF,
      );
    } catch (e) {
      setDownloadError('Something went wrong. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

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
              <td>Submitted</td>
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

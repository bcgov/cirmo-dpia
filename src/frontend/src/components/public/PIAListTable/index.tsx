import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { API_ROUTES } from '../../../constant/apiRoutes';
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
              <td>{pia.updatedAt}</td>
              <td>{pia.drafterName}</td>
              <td>{pia.status}</td>
              <td>
                <button
                  className="bcgovbtn bcgovbtn__tertiary"
                  onClick={() => handleDownload(pia.id)}
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

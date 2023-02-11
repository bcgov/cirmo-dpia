import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

import { statusList } from '../../../utils/status';
import { PIASubHeaderProps } from './interfaces';
import Alert from '../../common/Alert';
import { useState } from 'react';
import {
  FileDownload,
  FileDownloadTypeEnum,
} from '../../../utils/file-download.util';
import { API_ROUTES } from '../../../constant/apiRoutes';
import Spinner from '../../common/Spinner';

function PIASubHeader({
  pia,
  lastSaveAlertInfo,
  onSaveChangeClick = () => {},
  onSubmitClick = () => {},
}: PIASubHeaderProps) {
  //TODO implement tooltip for faEllipsisH icon, so when mouse hover, will display download word
  // this pr just add download function for faEllipsisH icon
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState('');
  const handleDownload = async () => {
    setDownloadError('');

    if (!pia.id) {
      console.error(
        'Something went wrong. Result Id not available for download',
      );
      setDownloadError('Something went wrong. Please try again.');
      return;
    }

    setIsDownloading(true);
    try {
      await FileDownload.download(
        API_ROUTES.PIA_INTAKE_RESULT_DOWNLOAD.replace(':id', `${pia.id}`),
        FileDownloadTypeEnum.PDF,
      );
    } catch (e) {
      setDownloadError('Something went wrong. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };
  const handleAlertClose = () => {
    setDownloadError('');
  };
  return (
    <>
      <div className="subheader-container wrapper">
        <h1>New PIA</h1>
        <div className="col">
          {downloadError && (
            <Alert
              type="danger"
              message="Something went wrong. Please try again."
              onClose={handleAlertClose}
              className="mt-2 col-sm-1"
            />
          )}
        </div>
        <div className=" row ms-auto ">
          <div className="col">
            <div>Status</div>
            <div>
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
            </div>
          </div>
          {lastSaveAlertInfo.show && (
            <div className="col col-md-4">
              <Alert
                type={lastSaveAlertInfo.type}
                message={lastSaveAlertInfo.message}
                showInitialIcon={true}
                showCloseIcon={false}
              />
            </div>
          )}

          <button
            onClick={() => handleDownload()}
            className="mx-2 bcgovbtn bcgovbtn__secondary"
          >
            <FontAwesomeIcon icon={faEllipsisH} />
            {isDownloading && <Spinner />}
          </button>

          <button
            onClick={onSaveChangeClick}
            className="mx-2 bcgovbtn bcgovbtn__secondary"
          >
            Save
          </button>

          <button
            onClick={onSubmitClick}
            className="bcgovbtn bcgovbtn__primary"
          >
            Submit PIA intake
          </button>
        </div>
      </div>
    </>
  );
}

export default PIASubHeader;

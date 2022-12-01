import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { API_ROUTES } from '../../../constant/apiRoutes';
import {
  FileDownload,
  FileDownloadTypeEnum,
} from '../../../utils/file-download.util';
import Spinner from '../../common/Spinner';
import { useState } from 'react';
import Alert from '../../common/Alert';
import Messages from './messages';
import MDEditor from '@uiw/react-md-editor';
import { IPIAResult } from '../../../types/interfaces/pia-result.interface';

interface IComponentProps {
  result: IPIAResult;
}

const PIAIntakeResults = (props: IComponentProps) => {
  const { result } = props;
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState('');

  const handleDownload = async () => {
    setDownloadError('');

    if (!result?.id) {
      console.error(
        'Something went wrong. Result Id not available for download',
      );
      setDownloadError('Something went wrong. Please try again.');
      return;
    }

    setIsDownloading(true);
    try {
      await FileDownload.download(
        API_ROUTES.PIA_INTAKE_RESULT_DOWNLOAD.replace(':id', `${result.id}`),
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
    <div className="results results-wrapper ppq-connect">
      <div className="form__header">
        <h1 className="">{Messages.Headings.Title.en}</h1>
      </div>
      <section className="form__section">
        <h2 className="form__h2">{Messages.Headings.StepOne.en}</h2>
        <p>
          <MDEditor.Markdown source={Messages.StepDetails.StepOne.en} />
        </p>
      </section>
      <section className="form__section download-results">
        <h2 className="form__h2">{Messages.Headings.StepTwo.en}</h2>
        <button
          className={`bcgovbtn bcgovbtn__secondary ${
            isDownloading ? 'opacity-50 pe-none' : ''
          }`}
          onClick={handleDownload}
        >
          {Messages.DownloadButtonText.en}
          <FontAwesomeIcon className="icon" icon={faFileDownload} />
          {isDownloading && <Spinner />}
        </button>
        {downloadError && (
          <Alert
            type="danger"
            message="Something went wrong. Please try again."
            onClose={handleAlertClose}
            className="mt-2"
          />
        )}
      </section>
      <section className="form__section email-results">
        <h2>{Messages.Headings.StepThree.en}</h2>
        <p>{Messages.StepDetails.StepThree.en}</p>
      </section>
      <section className="form__section">
        <h2>{Messages.Headings.StepFour.en}</h2>
        <p>{Messages.StepDetails.StepFour.en}</p>
      </section>
      <div className="horizontal-divider"></div>
      <div className="form-buttons connect-buttons">
        <Link to="/ppq" className="bcgovbtn bcgovbtn__primary btn-next ms-auto">
          Done
        </Link>
      </div>
    </div>
  );
};

export default PIAIntakeResults;

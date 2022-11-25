import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { IPPQResult } from '../../../types/interfaces/ppq-result.interface';
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

interface IComponentProps {
  result: IPPQResult;
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
        API_ROUTES.PPQ_RESULT_DOWNLOAD.replace(':id', `${result.id}`),
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
      <h1 className="results-header">{Messages.Headings.Title.en}</h1>
      <section className="find-your-mpo">
        <h2>{Messages.Headings.Subtitle.en}</h2>
        <h2>{Messages.Headings.StepOne.en}</h2>
        <p>
          <MDEditor.Markdown source={Messages.StepDetails.StepOne.en} />
        </p>
      </section>
      <section className="download-results">
        <h2>{Messages.Headings.StepTwo.en}</h2>
        <button
          className={`btn-secondary ${
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
      <section className="email-results">
        <h2>{Messages.Headings.StepThree.en}</h2>
        <p>{Messages.StepDetails.StepThree.en}</p>
      </section>
      <section className="find-your-mpo">
        <h2>{Messages.Headings.StepFour.en}</h2>
        <p>{Messages.StepDetails.StepFour.en}</p>
      </section>
      <div className="horizontal-divider"></div>
      <div className="form-buttons connect-buttons">
        <Link to="/ppq-form" className="btn-secondary btn-back">
          Back
        </Link>
        <Link to="/ppq" className="btn-primary btn-next">
          Done
        </Link>
      </div>
    </div>
  );
};

export default PIAIntakeResults;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { IPPQResult } from '../../../ts/interfaces/ppq-result.interface';
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

const PPQConnect = (props: IComponentProps) => {
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
      <h1 className="results-header">Connect with your MPO</h1>
      <section className="find-your-mpo">
        <h2>{Messages.Headings.One.en}</h2>
        <button
          className={`btn-secondary ${
            isDownloading ? 'opacity-50 pe-none' : ''
          }`}
          onClick={handleDownload}
        >
          PPQ Results
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
      <section className="download-results">
        <h2>{Messages.Headings.Two.en}</h2>
        <p>
          <MDEditor.Markdown source={Messages.Text.Two.en} />
        </p>
      </section>
      <section className="email-results">
        <h2>{Messages.Headings.Three.en}</h2>
        <p>{Messages.Text.Three.en}</p>
      </section>
      <div className="horizontal-divider"></div>
      <div className="form-buttons">
        <Link to="/ppq-results" className="btn-secondary btn-back">
          Back
        </Link>
        <Link to="/ppq" className="btn-primary btn-next">
          Done
        </Link>
      </div>
    </div>
  );
};

export default PPQConnect;

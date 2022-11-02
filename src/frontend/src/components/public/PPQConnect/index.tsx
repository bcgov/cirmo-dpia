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
        <h2>1. Find your MPO</h2>
        <p className="mpo-find-contact">
          Every ministry has a Ministry Privacy Officer (MPO).
          <a
            href="https://www2.gov.bc.ca/gov/content/governments/services-for-government/information-management-technology/privacy/resources/privacy-officers"
            rel="external noreferrer"
            target="_blank"
          >
            Identify your MPO and their contact information.
          </a>
        </p>
        <p className="privacy-helpline-contact">
          Can&lsquo;t find what you&lsquo;re looking for? Contact the Privacy
          Helpline.
          <br />
          <a href="tel:250-356-1851">250 356-1851</a>
          <br />
          <a href="mailto:privacy.helpline@gov.bc.ca">
            Privacy.Helpline@gov.bc.ca
          </a>
        </p>
      </section>
      <section className="download-results">
        <h2>2. Download your results</h2>
        <button
          className={`btn-secondary ${
            isDownloading ? 'opacity-50 pe-none' : ''
          }`}
          onClick={handleDownload}
        >
          Download PPQ Results
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
        <h2>3. Email your results to your MPO</h2>
        <p>
          MPOs are instrumental in writing and submitting good PIAs. Get the
          conversation started between your team and your MPO by emailing them
          your PPQ results. They will be able to help you through your PIA
          writing process once you begin.
        </p>
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

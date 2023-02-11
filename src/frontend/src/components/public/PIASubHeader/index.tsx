import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

import { statusList } from '../../../utils/status';
import { PIASubHeaderProps } from './interfaces';
import Alert from '../../common/Alert';

function PIASubHeader({
  pia,
  lastSaveAlertInfo,
  onSaveChangeClick = () => {},
  onSubmitClick = () => {},
}: PIASubHeaderProps) {
  return (
    <>
      <div className="subheader-container wrapper">
        <h1>New PIA</h1>

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

          <button className="mx-2 bcgovbtn bcgovbtn__secondary">
            <FontAwesomeIcon icon={faEllipsisH} />
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
import { useContext, useEffect, useRef, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { API_ROUTES } from '../../../constant/apiRoutes';
import { routes } from '../../../constant/routes';
import Modal from '../../common/Modal';
import { useFetchKeycloakUserInfo } from '../../../hooks/userFetchKeycloakUserInfo';
import { AuthContext } from '../../../hooks/useAuth';
import {
  authLogoutHandler,
  ConfigStorageKeys,
  isAuthenticated,
  TokenStorageKeys,
} from '../../../utils/auth';
import { AppStorage } from '../../../utils/storage';
import { statusList } from '../../../utils/status';
import { IPIAIntake } from '../../../types/interfaces/pia-intake.interface';
import { PIASubHeaderProps } from './interfaces';

function PIASubHeader({
  pia,
  lastSaveAlertInfo,
  onChange = () => {},
  onSubmitClick = () => {},
}: PIASubHeaderProps) {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');

  const hideModalDialog = async () => {
    setShowModal(false);
  };
  const showModalDialog = () => {
    setShowModal(true);
  };
  const cancelModalDialog = () => {
    setShowModal(false);
  };
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
          <div className="row justify-content-between">
            <div className="col col-md-6">
              <h1>{Messages.PiaIntakeHeader.H1Text.en}</h1>
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
          </div>
          <button className="mx-2 bcgovbtn bcgovbtn__secondary">
            <FontAwesomeIcon icon={faEllipsisH} />
          </button>

          <button className="mx-2 bcgovbtn bcgovbtn__secondary">Save</button>

          <button className="bcgovbtn bcgovbtn__primary">
            Submit PIA intake
          </button>
        </div>
      </div>
    </>
  );
}

export default PIASubHeader;

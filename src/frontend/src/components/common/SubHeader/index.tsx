import { useContext, useEffect, useRef, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { API_ROUTES } from '../../../constant/apiRoutes';
import { routes } from '../../../constant/routes';
import Modal from '../Modal';
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

type Props = {
  user: string | null;
};
function SubHeader({ user }: Props) {
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
          <div className='col'>
            <div>Status</div>
            <div> {pia.status ? (
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
                )}</div>
            </div>  
        <button className="mx-2 bcgovbtn bcgovbtn__secondary">
        <FontAwesomeIcon icon={faEllipsisH} />
          </button>
      
          <button className="mx-2 bcgovbtn bcgovbtn__secondary">
            Save
          </button>

          <button className="bcgovbtn bcgovbtn__primary">
            Submit PIA intake
          </button>
        </div>
      </div>
    </>
  );
}

export default SubHeader;

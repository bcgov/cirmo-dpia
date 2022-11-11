import React, { useContext, useEffect, useRef, useState } from 'react';

import BCGovLogo from '../../../assets/BC_Logo_Horizontal.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { API_ROUTES } from '../../../constant/apiRoutes';
import { routes } from '../../../constant/routes';
import Modal from '../Modal';
import { HttpRequest } from '../../../utils/http-request.util';
import { useFetchKeycloakUserInfo } from '../../../hooks/userFetchKeycloakUserInfo';
import { AuthContext } from '../../../hooks/useAuth';
import { clearTokens, isAuthenticated, storeTokens } from '../../../utils/auth';
import { getAccessToken } from '../../../utils/getAccessToken';
import { setItemInStorage } from '../../../utils/helper.util';

type Props = {
  user: string | null;
};
function Header({ user }: Props) {
  const navigate = useNavigate();
  const { setAuthenticated } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('access_token'),
  );
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const code = searchParams.get('code');
  const didAuthRef = useRef(false);
  const { keycloakUserDetail, error: userInfoError } =
    useFetchKeycloakUserInfo(accessToken);
  // https://github.com/microsoft/TypeScript/issues/48949
  // workaround
  const win: Window = window;
  /**
   * Notes:
   * this uesEffect hook use a special trick to bypass react feature that will
   * render component twice in development environment
   * however we are use keycloak authorization flow to do authentication, and per keycloak,
   * Each authorization code can be used only once, to generate single new access token.
   * therefor we can not trigger another call using the same authorization code.
   * which means we can not apply solution mentioned in https://beta.reactjs.org/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development)
   * we must stop the second api call to keycloak, that's why we are using ref here to stop second call
   */
  useEffect(() => {
    async function startFetching() {
      if (didAuthRef.current === false) {
        try {
          didAuthRef.current = true;
          const keycloakToken = await getAccessToken(code);
          if (keycloakToken !== undefined) {
            storeTokens(keycloakToken);
            setAuthenticated(true);
            setAccessToken(keycloakToken.access_token);
            navigate(routes.PPQ_LANDING_PAGE);
          }
        } catch (e) {
          setMessage('login failed');
          console.log(e);
        }
      }
    }
    startFetching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  useEffect(() => {
    if (!accessToken) return;
    if (
      keycloakUserDetail !== undefined &&
      keycloakUserDetail !== null &&
      userInfoError === null
    ) {
      setItemInStorage('userName', keycloakUserDetail.name);
    }
  }, [accessToken, keycloakUserDetail, userInfoError]);

  const login = () => {
    win.location = `/${API_ROUTES.KEYCLOAK_LOGIN}`;
  };

  const logout = async () => {
    setAuthenticated(false);
    const keycloakTokenObj = {
      access_token: win.localStorage.getItem('access_token'),
      refresh_token: win.localStorage.getItem('refresh_token'),
      expires_in: win.localStorage.getItem('expires_in'),
      refresh_expires_in: win.localStorage.getItem('refresh_expires_in'),
    };

    await HttpRequest.post(API_ROUTES.KEYCLOAK_LOGOUT, keycloakTokenObj);
    clearTokens();
    setAccessToken(null);
    navigate('/');
  };
  const hideModalDialog = async () => {
    await logout();
    setShowModal(false);
  };
  const showModalDialog = () => {
    setShowModal(true);
  };
  const cancelModalDialog = () => {
    setShowModal(false);
  };
  return (
    <header>
      <div className="banner">
        <a href="https://gov.bc.ca">
          <img
            className="logo"
            src={BCGovLogo}
            alt="Go to the Government of British Columbia website"
          />
        </a>
        <h1 className="header-h1">
          Digital Privacy Impact Assessment (DPIA) <span>beta</span>
        </h1>
      </div>
      <div className="message">{message ? <p>{message}</p> : null}</div>
      <div data-cy="login" className="other">
        {!isAuthenticated() && (
          <button className="btn-login" onClick={() => login()}>
            Log in with IDIR <FontAwesomeIcon className="icon" icon={faUser} />
          </button>
        )}
        <Modal
          confirmLabel="Yes, sign out"
          cancelLabel="Cancel"
          titleText="Sign out confirmation"
          show={showModal}
          handleClose={hideModalDialog}
          handleCancel={cancelModalDialog}
        >
          <p className="modal-text">
            Are you sure you would like to sign out of the platform? You will be
            taken out to the landing page.
          </p>
        </Modal>
        {isAuthenticated() && (
          <button className="btn-logout" onClick={() => showModalDialog()}>
            Sign Out
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;

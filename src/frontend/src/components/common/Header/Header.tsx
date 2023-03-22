import { useContext, useEffect, useRef, useState } from 'react';

import BCGovLogo from '../../../assets/BCGovLogo_negative.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { API_ROUTES } from '../../../constant/apiRoutes';
import { routes } from '../../../constant/routes';
import Modal from '../Modal';
import { HttpRequest } from '../../../utils/http-request.util';
import { useFetchKeycloakUserInfo } from '../../../hooks/userFetchKeycloakUserInfo';
import { AuthContext } from '../../../hooks/useAuth';
import {
  authLogoutHandler,
  ConfigStorageKeys,
  isAuthenticated,
  storeAuthTokens,
  TokenStorageKeys,
} from '../../../utils/auth';
import { getAccessToken } from '../../../utils/getAccessToken';
import { IConfig } from '../../../types/interfaces/config.interface';
import { AppStorage } from '../../../utils/storage';

type Props = {
  user: string | null;
};
function Header({ user }: Props) {
  const navigate = useNavigate();
  const { setAuthenticated } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [accessToken, setAccessToken] = useState<string | null>(
    AppStorage.getItem<string>(TokenStorageKeys.ACCESS_TOKEN) || null,
  );
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const code = searchParams.get('code');
  const didAuthRef = useRef(false);
  const { keycloakUserDetail, error: userInfoError } = useFetchKeycloakUserInfo(
    accessToken || null,
  );
  // https://github.com/microsoft/TypeScript/issues/48949
  // workaround
  const win: Window = window;
  /**
   * Notes:
   * this uesEffect hook use a special trick to bypass react feature that will
   * render component twice in development environment
   * because we are use keycloak authorization flow to do authentication, and per keycloak,
   * Each authorization code can be used only once, to generate single new access token.
   * therefor we can not trigger another call using the same authorization code.
   * which means we can not apply solution mentioned in https://beta.reactjs.org/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development)
   * we must stop the second api call to keycloak, that's why we are using ref here to stop second call
   */
  useEffect(() => {
    if (!code) return;
    async function startFetching() {
      if (didAuthRef.current === false) {
        try {
          didAuthRef.current = true;
          const keycloakToken = await getAccessToken(code);
          if (keycloakToken !== undefined) {
            storeAuthTokens(keycloakToken);
            setAuthenticated(true);
            setAccessToken(keycloakToken.access_token);
            const config = await HttpRequest.get<IConfig>(
              API_ROUTES.CONFIG_FILE,
            );
            AppStorage.setItem(ConfigStorageKeys.CONFIG, config);
            // TODO: Refactor protected routing to allow for keycloak
            // to use redirect URI instead of this value
            navigate(routes.PIA_LIST);
          } else {
            throw new Error('Invalid Token Information found');
          }
        } catch (e) {
          setMessage('login failed');
          console.log(e);
        }
      }
    }
    startFetching();
  }, [code, navigate, setAuthenticated]);

  useEffect(() => {
    if (!accessToken) return;
    if (
      keycloakUserDetail !== undefined &&
      keycloakUserDetail !== null &&
      userInfoError === null
    ) {
      AppStorage.setItem(ConfigStorageKeys.USERNAME, keycloakUserDetail.name);
      AppStorage.setItem(
        ConfigStorageKeys.ROLES,
        keycloakUserDetail.client_roles,
      );
    }
  }, [accessToken, keycloakUserDetail, userInfoError]);

  const login = () => {
    win.location = API_ROUTES.KEYCLOAK_LOGIN;
  };

  const logout = async () => {
    setAuthenticated(false);

    authLogoutHandler((pathUrl) => {
      setAccessToken(null);
      navigate(pathUrl);
    });
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
    <header className="header wrapper">
      <div className="banner">
        <a href="/">
          <img
            className="logo"
            src={BCGovLogo}
            alt="Go to the Government of British Columbia website"
          />
        </a>
        <p>
          <b>
            Digital Privacy Impact Assessment (DPIA) <span>beta</span>
          </b>
        </p>
      </div>
      <div className="message">{message ? <p>{message}</p> : null}</div>
      <div data-cy="login" className="other">
        {!isAuthenticated() && (
          <button
            className="bcgovbtn bcgovbtn__secondary--dark"
            onClick={() => login()}
          >
            Log in with IDIR <FontAwesomeIcon className="icon" icon={faUser} />
          </button>
        )}
        <Modal
          confirmLabel="Yes, sign out"
          cancelLabel="Cancel"
          titleText="Sign out confirmation"
          show={showModal}
          reversed={true}
          handleClose={hideModalDialog}
          handleCancel={cancelModalDialog}
        >
          <p className="modal-text">
            Are you sure you would like to sign out of the platform? You will be
            taken out to the landing page.
          </p>
        </Modal>
        {isAuthenticated() && (
          <button
            className="bcgovbtn bcgovbtn__secondary--dark"
            onClick={() => showModalDialog()}
          >
            Sign Out
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;

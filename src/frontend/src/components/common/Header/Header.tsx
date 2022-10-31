import React, { useEffect, useState } from 'react';

import BCGovLogo from '../../../assets/BC_Logo_Horizontal.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { API_ROUTES } from '../../../constant/apiRoutes';
import { routes } from '../../../constant/routes';
import Modal from '../Modal';
import { HttpRequest } from '../../../utils/http-request.util';

type Props = {
  user: string | null;
};
function Header({ user }: Props) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('access_token'),
  );
  const [showModal, setShowModal] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [message, setMessage] = useState('');
  const code = searchParams.get('code');
  // https://github.com/microsoft/TypeScript/issues/48949
  // workaround
  const win: Window = window;

  useEffect(() => {
    if (!code) return;
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // by default setting the content-type to be json type
      body: JSON.stringify({ code: code }),
    };
    fetch(`/${API_ROUTES.KEYCLOAK_CALLBACK}`, options)
      .then((response) => response.json())
      .then((data) => {
        win.localStorage.setItem('access_token', data.access_token);
        win.localStorage.setItem('refresh_token', data.refresh_token);
        win.localStorage.setItem('expires_in', data.expires_in);
        win.localStorage.setItem('refresh_expires_in', data.refresh_expires_in);
        setAccessToken(data.access_token);
        navigate(routes.PPQ_LANDING_PAGE);
      });
  }, [code]);

  useEffect(() => {
    if (!accessToken) return;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${win.localStorage.getItem('access_token')}`,
      },
    };
    fetch(`${API_ROUTES.KEYCLOAK_USER}`, options)
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data);
        win.localStorage.setItem('userName', data.name);
      });
  }, [accessToken]);

  console.log('accessToken', accessToken);
  console.log('userInfo', userInfo);
  const apiURI = !import.meta.env.VITE_REACT_APP_LOCAL_DEV
    ? `${import.meta.env.VITE_REACT_API_BASE_URL}`
    : `http://${import.meta.env.VITE_REACT_API_HOST}:${
        import.meta.env.VITE_REACT_API_PORT
      }`;

  const login = () => {
    win.location = `${apiURI}/${API_ROUTES.KEYCLOAK_LOGIN}`;
  };

  const logout = async () => {
    console.log('test logout');
    const keycloakToken = {
      access_token: win.localStorage.getItem('access_token'),
      refresh_token: win.localStorage.getItem('refresh_token'),
      expires_in: win.localStorage.getItem('expires_in'),
      refresh_expires_in: win.localStorage.getItem('refresh_expires_in'),
    };
    await HttpRequest.post(API_ROUTES.KEYCLOAK_LOGOUT, keycloakToken);
    win.localStorage.removeItem('access_token');
    win.localStorage.removeItem('refresh_token');
    win.localStorage.removeItem('userName');
    setUserInfo(null);
    navigate('/');
  };
  const hideModalDialog = async () => {
    await logout();
    setShowModal(false);
  };
  const showModalDialog = () => {
    console.log('test modal open');
    setShowModal(true);
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
        {userInfo === null && (
          <button className="btn-login" onClick={() => login()}>
            Log in with IDIR <FontAwesomeIcon className="icon" icon={faUser} />
          </button>
        )}
        <Modal
          buttonLabel="logout"
          show={showModal}
          handleClose={hideModalDialog}
        >
          <p>Are you sure you want to logout curren session?</p>
        </Modal>
        {win.localStorage.getItem('userName') !== null &&
          win.localStorage.getItem('userName') !== 'undefined' && (
            <button className="btn-logout" onClick={() => showModalDialog()}>
              Sign Out
              <FontAwesomeIcon className="icon" icon={faChevronDown} />
            </button>
          )}
      </div>
    </header>
  );
}

export default Header;

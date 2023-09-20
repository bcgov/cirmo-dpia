import { Link } from 'react-router-dom';
import UnAuthorizedImg from '../../../assets/401.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { TokenStorageKeys, login } from '../../../utils/auth';
import { AppStorage } from '../../../utils/storage';

const Unauthorized = () => {
  const redirect = AppStorage.getItem(TokenStorageKeys.POST_LOGIN_REDIRECT_URL);
  return (
    <div className="bcgovPageContainer notfound-container">
      <div className="container">
        <img
          className="rounded mx-auto d-block "
          src={UnAuthorizedImg}
          alt="not authorized"
        />
        <div className="row ">
          <h1 className="d-flex justify-content-center">
            401: Authorization required
          </h1>
        </div>

        <div className="row ">
          <p className="d-flex justify-content-center">
            You do not have permission to view this page.
          </p>
        </div>
        <div className="row ">
          <p className="d-flex justify-content-center">
            After login you will be redirected to {redirect}
          </p>
        </div>
        <div className="row d-flex justify-content-center gap-3">
          <button
            className="bcgovbtn bcgovbtn__primary"
            onClick={() => login()}
          >
            Log in with IDIR
            <FontAwesomeIcon className="icon" icon={faUser} />
          </button>
          <Link className="bcgovbtn bcgovbtn__secondary" to="/">
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;

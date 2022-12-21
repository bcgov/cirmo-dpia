import { Link } from 'react-router-dom';
import UnAuthorizedImg from '../../../assets/401.svg';

const Unauthorized = () => (
  <div className="bcgovPageContainer notfound-container">
    <div className="container">
      <img
        className="rounded mx-auto d-block "
        src={UnAuthorizedImg}
        alt="not authorized"
      />
      <div className="row ">
        <h1 className="d-flex justify-content-center">
          {' '}
          401: Authorization required
        </h1>
      </div>

      <div className="row ">
        <p className="d-flex justify-content-center">
          You do not have permission to view this page.
        </p>
      </div>
      <div className="row d-flex justify-content-center">
        <Link className="bcgovbtn bcgovbtn__primary" to="/">
          Go to Home
        </Link>
      </div>
    </div>
  </div>
);

export default Unauthorized;

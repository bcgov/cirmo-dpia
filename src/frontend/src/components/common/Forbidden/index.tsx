import { Link } from 'react-router-dom';
import ForbiddenImg from '../../../assets/403.svg';

const Forbidden = () => {
  return (
    <div className="bcgovPageContainer notfound-container">
      <div className="container">
        <img
          className="rounded mx-auto d-block"
          src={ForbiddenImg}
          alt="Forbidden"
        />
        <div className="row ">
          <h1 className="d-flex justify-content-center">
            403: Forbidden Access
          </h1>
        </div>
        <div className="row ">
          <h3 className="d-flex justify-content-center">
            You do not have permission to view this page.
          </h3>
        </div>
        <div className="row d-flex justify-content-center mt-3">
          <Link className="bcgovbtn bcgovbtn__primary " to="/pia/list">
            Back to Active PIAs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;

import { Link } from 'react-router-dom';
import NotFoundImg from '../../../assets/404.png';

const Unauthorized = () => (
  <div className="bcgovPageContainer notfound-container">
    <div className="container">
      <img
        className="rounded mx-auto d-block "
        src={NotFoundImg}
        alt="Not Found"
      />
      <div className="row ">
        <h1 className="d-flex justify-content-center"> 404</h1>
      </div>

      <div className="row ">
        <p className="d-flex justify-content-center">
          We are sorry, but the page you were looking for does not exist.
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

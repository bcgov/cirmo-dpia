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
<<<<<<< HEAD
=======
          {' '}
>>>>>>> 0f620e3 (Implements PIA intake save modal with different text content and CTAs based on which button is pressed. Had to mess with the existing modal component to allow for the 'Sign out' modal to look the same while the new modals reflect iteration 4 designs)
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

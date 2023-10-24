import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faUser,
  faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import hypothesis from '../../assets/public_homepage/hypothesis.svg';
import vision from '../../assets/public_homepage/vision.svg';
import problem from '../../assets/public_homepage/problem.svg';
import Callout from '../../components/common/Callout';
import Messages from './messages';
import { Link } from 'react-router-dom';
import hero from '../../assets/public_homepage/hero.svg';
import { isAuthenticated, login } from '../../utils/auth';

function LandingPage() {
  return (
    <div>
      <section className="hero-section wrapper">
        <div data-cy="landing" className="hero-content">
          <img className="d-xxl-none" src={hero} alt="Fill out PIA" />
          <h1>{Messages.PageTitle.en}</h1>
          <p>
            {Messages.PageDescriptionParagraphOne.PartOne.en}
            <a
              href={Messages.PageDescriptionParagraphOne.LinkHref.en}
              target="_blank"
              rel="noopener noreferrer"
            >
              {Messages.PageDescriptionParagraphOne.LinkText.en}
              <FontAwesomeIcon icon={faUpRightFromSquare} />
            </a>
            {Messages.PageDescriptionParagraphOne.PartTwo.en}
          </p>
          <br />
          <p>
            {Messages.PageDescriptionParagraphTwo.PartOne.en}
            <a
              href={Messages.PageDescriptionParagraphTwo.LinkHref.en}
              target="_blank"
              rel="noopener noreferrer"
            >
              {Messages.PageDescriptionParagraphTwo.LinkText.en}
              <FontAwesomeIcon icon={faUpRightFromSquare} />
            </a>
            {Messages.PageDescriptionParagraphTwo.PartTwo.en}
          </p>
          <div data-cy="contact-btn" className="ctas">
            {!isAuthenticated() && (
              <button
                className="bcgovbtn bcgovbtn__primary"
                onClick={() => login()}
              >
                {Messages.Authenticated.No.Text.en}
                <FontAwesomeIcon className="icon" icon={faUser} />
              </button>
            )}
            {isAuthenticated() && (
              <Link className="bcgovbtn bcgovbtn__primary" to="/pia">
                {Messages.Authenticated.Yes.Text.en}
              </Link>
            )}
            <a
              href="mailto:pia.intake@gov.bc.ca"
              data-cy="email"
              className="bcgovbtn bcgovbtn__secondary"
            >
              {Messages.Contact.Text.en}{' '}
              <FontAwesomeIcon className="icon" icon={faEnvelope} />
            </a>
          </div>
        </div>
      </section>
      <section className="what-is-a-pia">
        <h2>{Messages.WhatIsAPia.Title.en}</h2>
        <p>{Messages.WhatIsAPia.Description.en}</p>
        <a
          href={Messages.WhatIsAPia.LinkHref.en}
          target="_blank"
          rel="noopener noreferrer"
        >
          {Messages.WhatIsAPia.LinkText.en}
          <FontAwesomeIcon icon={faUpRightFromSquare} />
        </a>
      </section>
      <section className="landing-page-callout-container">
        <Callout text={Messages.Callout.Text.en} />
      </section>
      <section className="info-section wrapper">
        <div className="problem-subsec">
          <img src={problem} alt="Web Search" />
          <div className="info-subsec-text">
            <h2>{Messages.Problem.Title.en}</h2>
            <p>{Messages.Problem.Description.en}</p>
          </div>
        </div>
        <div className="hypothesis-subsec">
          <img src={hypothesis} alt="New Ideas" />
          <div className="info-subsec-text">
            <h2>{Messages.Hypothesis.Title.en}</h2>
            <p>{Messages.Hypothesis.Description.en}</p>
          </div>
        </div>
        <div className="vision-subsec">
          <img src={vision} alt="Shared Goals" />
          <div className="info-subsec-text">
            <h2>{Messages.Vision.Title.en}</h2>
            <p>{Messages.Vision.Description.en}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import heroImg from '../../assets/public_homepage/hero.svg';
import hypothesis from '../../assets/public_homepage/hypothesis.svg';
import vision from '../../assets/public_homepage/vision.svg';
import problem from '../../assets/public_homepage/problem.svg';
import newIdeas from '../../assets/undraw_new_ideas.svg';
import webSearch from '../../assets/undraw_web_search.svg';
import sharedGoals from '../../assets/undraw_shared_goals.svg';
import Callout from '../../components/common/Callout';
import { Link } from 'react-router-dom';
import { API_ROUTES } from '../../constant/apiRoutes';
import { isAuthenticated } from '../../utils/auth';

function LandingPage() {
  // https://github.com/microsoft/TypeScript/issues/48949
  // workaround
  const win: Window = window;
  const login = () => {
    win.location = `/${API_ROUTES.KEYCLOAK_LOGIN}`;
  };
  return (
    <div>
      <section className="hero-section wrapper">
        <div data-cy="landing" className="hero-content">
          <h1>Digital Privacy Impact Assessment (DPIA)</h1>
          <p>
            The Government of BC is creating a flagship Digital Privacy Impact
            Assessment (DPIA). This project will leverage service design
            findings to build a novel product that reimagines the Privacy Impact
            Assessment (PIA) tools to support streamlined business processes and
            improved user experience.
          </p>
          <div data-cy="contact-btn" className="ctas">
            {!isAuthenticated() && (
              <button className="bcgovbtn bcgovbtn__primary" onClick={() => login()}>
                Log in with IDIR
                <FontAwesomeIcon className="icon" icon={faUser} />
              </button>
            )}
            {isAuthenticated() && (
              <Link className="bcgovbtn bcgovbtn__primary" to="/ppq">
                Access App
              </Link>
            )}
            <a
              href="mailto:pia.intake@gov.bc.ca"
              data-cy="email"
              className="bcgovbtn bcgovbtn__secondary"
            >
              Contact <FontAwesomeIcon className="icon" icon={faEnvelope} />
            </a>
          </div>
        </div>
      </section>
      <section className="what-is-a-pia">
        <h2>What is a Privacy Impact Assessment</h2>
        <p>
          A PIA is a step-by-step review process to make sure you protect the
          personal information you collect, use or disclose in your project.
          Doing a PIA can help protect privacy and build public trust by being
          clear about what information government is collecting, who has access
          to it, and where and how it’s stored.
        </p>
        <a href="https://www2.gov.bc.ca/gov/content/governments/services-for-government/information-management-technology/privacy/privacy-impact-assessmentS">
          Learn about the current PIA process
        </a>
      </section>
      <Callout text="These are draft statements and may change and evolve with feedback from interested parties." />
      <section className="info-section wrapper">
        <div className="problem-subsec">
          <img src={problem} alt="Web Search" />
          <div className="info-subsec-text">
            <h2>Problem</h2>
            <p>
              The Privacy, Compliance and Training (PCT) is government’s
              corporate privacy office and has the mandate to review all PIAs
              for BC government ministries. PCT has seen a 686% increase in PIAs
              submitted for review in within a 10 year period. While the
              increase in volume is exponential, the statistics do not reflect
              the pressures that result from increased complexity of PIA
              submissions.{' '}
            </p>
          </div>
        </div>
        <div className="hypothesis-subsec">
          <img src={hypothesis} alt="New Ideas" />
          <div className="info-subsec-text">
            <h2>Hypothesis</h2>
            <p>
              The DPIA will alleviate unsustainable workload pressures, connect
              siloed information, support innovation, reduce repetition in the
              PIA process and enable compliance with legislated PIA
              requirements.
            </p>
          </div>
        </div>
        <div className="vision-subsec">
          <img src={vision} alt="Shared Goals" />
          <div className="info-subsec-text">
            <h2>Vision</h2>
            <p>
              The DPIA will be an integrated, guided, online tool for the for
              anyone working in a BC ministry that needs to complete a PIA.
              Digitizing the PIA will create a streamlined experience that
              enables a culture of privacy and innovation.{' '}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;

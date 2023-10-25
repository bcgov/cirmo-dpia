import messages from './helper/messages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

const NextStepsDelegatedFlow = () => {
  return (
    <>
      <section className="bg-white drop-shadow section__padding-block section__padding-inline drop-stadow section__margin-block  section-border-radius">
        <h3>{messages.Delegated.heading.en}</h3>
        <p>
          {messages.Delegated.description.desc1.en}
          <a
            href={messages.Delegated.description.link.href}
            target="_blank"
            rel="noreferrer"
          >
            {messages.Delegated.description.link.en}
            <FontAwesomeIcon icon={faUpRightFromSquare} />
          </a>
          {messages.Delegated.description.desc2.en}
        </p>
        <p>
          <div>{messages.Delegated.helpline.title.en}</div>
          <div>
            <a href={`tel:${messages.Delegated.helpline.telephone.en} `}>
              {messages.Delegated.helpline.telephone.en}
            </a>
          </div>
          <div>
            <a href={`mailto:${messages.Delegated.helpline.email.en} `}>
              {messages.Delegated.helpline.email.en}
            </a>
          </div>
        </p>
      </section>
    </>
  );
};

export default NextStepsDelegatedFlow;

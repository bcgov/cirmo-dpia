import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import messages from '../../helper/messages';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

export const NotifyMPO = () => {
  return (
    <div className="section__padding-block">
      <h4>{messages.FullPIA.NotifyMPO.heading.en}</h4>
      <div className="bg-white drop-shadow section__padding-block section__padding-inline drop-stadow  section-border-radius">
        <p>
          {messages.FullPIA.NotifyMPO.descriptionPart1.en}
          <a
            href={messages.FullPIA.NotifyMPO.link.href}
            target="_blank"
            rel="noreferrer"
          >
            {messages.FullPIA.NotifyMPO.link.en}{' '}
            <FontAwesomeIcon icon={faUpRightFromSquare} />
          </a>
          {messages.FullPIA.NotifyMPO.descriptionPart2.en}
        </p>
        <p>
          <div>{messages.FullPIA.NotifyMPO.descriptionPart3.en}</div>
          <div>
            <a href={`tel:${messages.FullPIA.NotifyMPO.telephone.en} `}>
              {messages.FullPIA.NotifyMPO.telephone.en}
            </a>
          </div>
          <div>
            <a href={`mailto:${messages.FullPIA.NotifyMPO.email.en} `}>
              {messages.FullPIA.NotifyMPO.email.en}
            </a>
          </div>
        </p>
      </div>
    </div>
  );
};

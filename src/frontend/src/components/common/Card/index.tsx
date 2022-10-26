import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactElement } from 'react';
import { CardProps } from './interfaces';

const Card = ({
  icon,
  title,
  text,
  button,
  buttonText,
  buttonIcon,
}: CardProps): ReactElement => {
  return (
    <div className="card-wrapper">
      <div className="card-icon">
        <FontAwesomeIcon icon={icon} />
      </div>
      <h2 className="card-title">{title}</h2>
      <p className="card-text">{text}</p>
      {!button ? null : (
        <button className="card-button btn-secondary">
          {buttonText}
          {!buttonIcon ? null : (
            <FontAwesomeIcon className="button-icon" icon={buttonIcon} />
          )}
        </button>
      )}
    </div>
  );
};

export default Card;

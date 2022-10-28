import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactElement } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { CardProps } from './interfaces';

const Card = ({
  icon,
  title,
  text,
  button,
  buttonText,
  buttonIcon,
  buttonUrl,
}: CardProps): ReactElement => {
  return (
    <div className="card-wrapper">
      <div className="card-icon">
        <FontAwesomeIcon icon={icon} />
      </div>
      <h2 className="card-title">{title}</h2>
      <MDEditor.Markdown
        className="card-text"
        source={text}
        linkTarget="_blank"
      />
      {!button ? null : (
        <a href={buttonUrl} className="card-button btn-secondary">
          {buttonText}
          {!buttonIcon ? null : (
            <FontAwesomeIcon className="button-icon" icon={buttonIcon} />
          )}
        </a>
      )}
    </div>
  );
};

export default Card;

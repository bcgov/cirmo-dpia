import React from 'react';
import Messages from '../helper/messages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { PIAInformationProps } from '../pia-form-intake.interface';

const PIAInformation: React.FC<PIAInformationProps> = ({ isReadOnly }) => {
  const renderListItems = () => {
    return Messages.PiaIntakeHeader.ListText.map((item, index) => (
      <li key={index}>
        {item.en}
        {item.linkHref && item.linkText && (
          <a href={item.linkHref} rel="noreferrer external" target="_blank">
            {item.linkText}
            <FontAwesomeIcon className="ms-1" icon={faUpRightFromSquare} />
          </a>
        )}
      </li>
    ));
  };

  return (
    <section>
      <h2>{Messages.PiaIntakeHeader.H1Text.en}</h2>
      {!isReadOnly && (
        <>
          <h3>{Messages.PiaIntakeHeader.H2Text.en}</h3>
          <ul>{renderListItems()}</ul>
        </>
      )}
    </section>
  );
};

export default PIAInformation;

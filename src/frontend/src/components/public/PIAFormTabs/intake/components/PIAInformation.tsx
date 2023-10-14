import React from 'react';
import Messages from '../helper/messages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { PIAInformationProps } from '../helper/pia-form-intake.interface';

const PIAInformation: React.FC<PIAInformationProps> = ({ isReadOnly }) => {
  // Destructure messages from the Messages object
  const { H1Text, H2Text, ListText } = Messages.PiaIntakeHeader;

  // Function to render the list items
  const renderListItems = () => {
    return ListText.map((item, index) => (
      <li key={index}>
        {item.en}
        {/* If the item has a link, render the link */}
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
      {/* Render the section heading */}
      <h2>{H1Text.en}</h2>
      {/* If the form is editable, render the list */}
      {!isReadOnly && (
        <>
          <h3>{H2Text.en}</h3>
          <ul>{renderListItems()}</ul>
        </>
      )}
    </section>
  );
};

export default PIAInformation;

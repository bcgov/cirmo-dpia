import React from 'react';

function PPQNavBar() {
  return (
    <div data-cy="ppq-nav-bar" className="ppq-form-nav-bar">
      <div className="ppq-nav-header">
        <a href="/">
          <p> Home </p>
        </a>
      </div>
      <div>
        <a href="/ppq">
          <p> PIA Pathway Questionnaire</p>
        </a>
      </div>
    </div>
  );
}

export default PPQNavBar;

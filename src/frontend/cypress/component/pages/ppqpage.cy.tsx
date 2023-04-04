import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import PPQLandingPage, {
  IComponentProps,
} from '../../../src/pages/PPQPage/PPQPage';

describe('PPQLandingPage', () => {
  const defaultProps: IComponentProps = {
    showMPOContents: true,
  };

  it('should render the component with PIA intake and PPQ contents', () => {
    cy.mount(
      <Router>
        <PPQLandingPage {...defaultProps} />
      </Router>,
    );

    cy.get('h1').contains('Create New').should('be.visible');
    cy.get('h2').contains('PIA Intake').should('be.visible');
    cy.get('[data-cy=ppq-btn] a')
      .contains('Start PIA Intake')
      .should('be.visible');
    cy.get('h2').contains('PPQ').should('be.visible');
    cy.get('[data-cy=ppq-img] a').contains('Start PPQ').should('be.visible');
  });

  it('should render the component with only PIA intake contents when showMPOContents is false', () => {
    cy.mount(
      <Router>
        <PPQLandingPage {...defaultProps} showMPOContents={false} />
      </Router>,
    );

    cy.get('h1').contains('Create New').should('be.visible');
    cy.get('h2').contains('PIA Intake').should('be.visible');
    cy.get('[data-cy=ppq-btn] a')
      .contains('Start PIA Intake')
      .should('be.visible');
    cy.get('h2').contains('PPQ').should('not.exist');
    cy.get('[data-cy=ppq-img] a').contains('Start PPQ').should('not.exist');
  });
});

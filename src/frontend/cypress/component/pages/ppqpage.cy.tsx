import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import PPQLandingPage from '../../../src/pages/PPQPage/PPQPage';

describe('Create new Page', () => {
  it('should render the component with PIA intake and PPQ contents', () => {
    cy.mount(
      <Router>
        <PPQLandingPage showMPOContents />
      </Router>,
    );

    cy.get('h1').contains('Create New').should('be.visible');
    cy.get('h2').contains('PIA Intake').should('be.visible');
    cy.get('[data-cy=ppq-btn] a')
      .contains('Start PIA Intake')
      .should('be.visible');
    cy.get('[data-cy=ppq-btn] a')
      .contains('Start PIA Intake')
      .should('be.visible');
    cy.get('[data-cy=pia-img]')
      .find('img')
      .should('have.attr', 'src')
      .and('match', /pia_intake.svg/);
    cy.get('h2').contains('PIA Pathway Questionnaire').should('be.visible');
    cy.get('span').contains('Estimated time: 5 minutes');
    cy.get('[data-cy=ppq-img]')
      .find('img')
      .should('have.attr', 'src')
      .and('match', /ppq_homepage.svg/);
  });

  it('should render the component with only PIA intake contents when showMPOContents is false', () => {
    cy.mount(
      <Router>
        <PPQLandingPage showMPOContents={false} />
      </Router>,
    );

    cy.get('h1').contains('Create New').should('be.visible');
    cy.get('h2').contains('PIA Intake').should('be.visible');
    cy.get('[data-cy=ppq-btn] a')
      .contains('Start PIA Intake')
      .should('be.visible');
    cy.get('h2').contains('PIA Pathway Questionnaire').should('not.exist');
    cy.get('span').contains('Estimated time: 20 minutes');
  });
});

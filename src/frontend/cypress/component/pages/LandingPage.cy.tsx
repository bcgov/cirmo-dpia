import React from 'react';
import LandingPage from '../../../src/pages/LandingPage/LandingPage';

describe('landingpage.cy.tsx', () => {
  it('should mount landing page content', () => {
    cy.mount(<LandingPage />);

    cy.get('[data-cy="contact-btn"]').contains('Log in with IDIR');
    cy.get('[data-cy="landing"]').contains(
      'Digital Privacy Impact Assessment (DPIA)',
    );
    cy.get('[data-cy="contact-btn"]').contains('Contact');
    cy.get('[data-cy="email"]')
      .should('have.attr', 'href')
      .and('match', /pia.intake@gov.bc.ca/);
    cy.get('[data-cy="landing"]')
      .find('img')
      .should('have.attr', 'src')
      .and('match', /hero.svg/);
  });
});

import PPQLandingPage from '../../../src/pages/PPQPage';

describe('ppqpage.cy.tsx', () => {
  it('should mount ppq page content', () => {
    cy.mount(<PPQLandingPage />);

    cy.get('[data-cy="login"]').contains('first.last@gov.bc.ca');
    
    cy.get('[data-cy="ppq-btn"]').contains('Get started');
    cy.get('[data-cy="ppq-img"]')
      .find('img')
      .should('have.attr', 'src')
      .and('match', /ppq_homepage.svg/);
  });
});

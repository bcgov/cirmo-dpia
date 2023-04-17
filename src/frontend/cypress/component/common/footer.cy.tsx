import Footer from '../../../src/components/common/Footer/Footer';

describe('Footer component', () => {
  it('render footer component', () => {
    cy.mount(<Footer />);
    cy.get("[data-cy='footer']").contains('Home');
    cy.get("[data-cy='footer']").contains('About gov.bc.ca');
    cy.get("[data-cy='footer']").contains('Disclaimer');
    cy.get("[data-cy='footer']").contains('Accessibility');
    cy.get("[data-cy='footer']").contains('Copyright');
    cy.get("[data-cy='footer']").contains('Contact us');
  });
});

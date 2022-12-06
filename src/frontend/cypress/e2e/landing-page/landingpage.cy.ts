describe('Test DPIA Landing Page', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    const url = Cypress.config().baseUrl; //accessing baseUrl
    cy.visit(url);
  });

  it('displays header by default', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.get('.header-h1').contains('Digital Privacy Impact Assessment (DPIA) ');
    cy.get('.bcgovbtn').contains('Log in with IDIR');
  });

  it('display main content of landing page', () => {
    const piaProcessURL =
      'https://www2.gov.bc.ca/gov/content/governments/services-for-government/information-management-technology/privacy/privacy-impact-assessmentS';
    cy.get('.hero-content').contains(
      'Digital Privacy Impact Assessment (DPIA)',
    );
    cy.get('[data-cy=email]').contains('Contact');
    cy.get('[data-cy=email]')
      .should('have.attr', 'href')
      .and('contains', 'mailto:pia.intake@gov.bc.ca');
    cy.get('.what-is-a-pia').contains('What is a Privacy Impact Assessment');
    cy.get('.what-is-a-pia').contains('Learn about the current PIA process');
    cy.get('.what-is-a-pia').within(() => {
      cy.get('a').should('have.length', 1);
      cy.get('a').should('have.attr', 'href', piaProcessURL);
    });
  });

  it('display footer by default', () => {
    cy.get('[data-cy=footer] li').should('have.length', 6);
    cy.get('[data-cy=footer] li').first().should('have.text', 'Home');
    cy.get('[data-cy=footer] li').last().should('have.text', 'Contact us');
  });
});

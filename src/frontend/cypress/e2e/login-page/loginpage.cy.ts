describe('Test DPIA Login Page', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include qit in our beforeEach function so that it runs before each test
    const url = Cypress.config().baseUrl; //accessing baseUrl
    if (!url) throw Error('can not find base URL, test stop');
    cy.visit(url);
  });

  it('click the login button', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.

    const password = Cypress.env('PASSWORD');

    cy.get('.d-none').click();
    cy.get('#user').type('DORGALE');
    cy.get('#password').type(password);
    cy.get('.btn-primary').click();
  });


  
  
});

export {};

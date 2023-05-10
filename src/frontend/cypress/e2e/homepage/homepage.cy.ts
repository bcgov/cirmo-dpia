describe('Test DPIA Home Page', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include qit in our beforeEach function so that it runs before each test
    const url = Cypress.config().baseUrl; //accessing baseUrl
    if (!url) throw Error('can not find base URL, test stop');
    cy.visit(url);

    const password = Cypress.env('PASSWORD');

    cy.get('.d-none',{ timeout: 50000 }).should('be.visible').and('contain','Log in with IDIR').click({force: true});
    cy.wait(3000);
    cy.get("div[class='form-element form-group'] input[name='user']").should('be.visible').type('DORGALE');
    cy.get("div[class='form-element form-group'] input[name='password']").should('be.visible').type(password);
    cy.get('.btn-primary').should('be.visible').click({force: true});
  });

  afterEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include qit in our beforeEach function so that it runs before each test
    cy.on('uncaught:exception', (err, runnable) => {    
      return false
    });
    
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.reload(true);

  });

  it('Check "List of PIA" tab', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.get('a[href="/pia/list"]',{ timeout: 50000 }).should('be.visible').and('contain','List of PIAs');
  });

  it('Check "Create  new" tab', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.get('a[href="/ppq"]',{ timeout: 50000 }).should('be.visible').and('contain','Create new');
  });

  it('Verify "List of PIA" URL', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    const url = Cypress.config().baseUrl; 
    if(url?.includes('test'))
    {
      cy.url().should('include','https://test.pia.gov.bc.ca/pia/list').end();
    }
    else if(url?.includes('dev'))
    {
      cy.url().should('include','https://dev.pia.gov.bc.ca/pia/list').end();
    }
    else
    {
      console.log('The URL for "List of PIA" is not correct');
    }
    
  });

 
});
export {};

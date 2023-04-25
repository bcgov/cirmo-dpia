describe('Test DPIA Login Page', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include qit in our beforeEach function so that it runs before each test
    cy.on('uncaught:exception', (err, runnable) => {    
      return false
    });
    const url = Cypress.config().baseUrl; //accessing baseUrl
    if (!url) throw Error('can not find base URL, test stop');
    cy.visit(url);
  });

  it('Check Log in URL', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.on('uncaught:exception', (err, runnable) => {    
      return false
    });

    const password = Cypress.env('PASSWORD');

    cy.get('.d-none').click();
    cy.get('#user').type('DORGALE');
    cy.get('#password').type(password);
    cy.get('.btn-primary').click();
    //cy.get('h1').contains('List of PIAs');
    const url = Cypress.config().baseUrl; 
    if(url?.includes('test'))
    {
      cy.url().should('include','https://test.pia.gov.bc.ca/pia/list')
    }
    else if(url?.includes('dev'))
    {
      cy.url().should('include','https://dev.pia.gov.bc.ca/pia/list')
    }
    else
    {
      console.log('The URL is neither test nor dev environment');
    }
    
  });

  it('Check Log in Title', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.on('uncaught:exception', (err, runnable) => {    
      return false
    });

    const password = Cypress.env('PASSWORD');

    cy.get('.d-none').click();
    cy.get('#user').type('DORGALE');
    cy.get('#password').type(password);
    cy.get('.btn-primary').click();
    cy.title().should('eq', 'Digital Privacy Impact Assessment (DPIA)')
    
  });

  it('Check BC Logo', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.on('uncaught:exception', (err, runnable) => {    
      return false
    });

    const password = Cypress.env('PASSWORD');

    cy.get('.d-none').click();
    cy.get('#user').type('DORGALE');
    cy.get('#password').type(password);
    cy.get('.btn-primary').click();
    cy.get('img[class="logo"]').should('be.visible');
    
  });

  it('Check log out functionality', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.on('uncaught:exception', (err, runnable) => {    
      return false
    });

    const password = Cypress.env('PASSWORD');

    cy.get('.d-none').click();
    cy.get('#user').type('DORGALE');
    cy.get('#password').type(password);
    cy.get('.btn-primary').click();
    cy.get('.d-md-block').click();
    cy.get('button.bcgovbtn.bcgovbtn__primary').eq(0).click({force: true}); //should('have.text',"Yes, sign out")
    //cy.url().should('eq','https://test.pia.gov.bc.ca/')
    cy.get('.d-none', { timeout: 20000 }).should('be.visible').should('have.text','Log in with IDIR');

    
  });

  it('Log in with Invalid username', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.on('uncaught:exception', (err, runnable) => {    
        return false
      });
    const password = Cypress.env('PASSWORD');

    cy.get('.d-none').click();
    cy.get('#user').type('DORGALE1');
    cy.get('#password').type(password);
    cy.get('.btn-primary').click();
    cy.get("span[class='field-help-text']",{ timeout: 10000 }).should('be.visible').should('have.text',"The username or password you entered is incorrect");

    
  });

  it('Log in with Invalid password', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.on('uncaught:exception', (err, runnable) => {    
        return false
      });
    const password = Cypress.env('WRONGPASSWORD');

    cy.get('.d-none').click();
    cy.get('#user').type('DORGALE');
    cy.get('#password').type(password);
    cy.get('.btn-primary').click();
    cy.get("span[class='field-help-text']",{ timeout: 10000 }).should('be.visible').should('have.text',"The username or password you entered is incorrect");

    
  });


});

export {};

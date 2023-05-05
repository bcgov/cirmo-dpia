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


  it('Check Log in URL', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.on('uncaught:exception', (err, runnable) => {    
      return false
    });

    const password = Cypress.env('PASSWORD');

    cy.get('.d-none',{ timeout: 50000 }).should('be.visible').and('contain','Log in with IDIR').click({force: true});
    cy.wait(3000);
    cy.get("div[class='form-element form-group'] input[name='user']").should('be.visible').type('DORGALE');
    cy.get("div[class='form-element form-group'] input[name='password']").should('be.visible').type(password);
    cy.get('.btn-primary').should('be.visible').click({force: true});
    //cy.get('h1').contains('List of PIAs');
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

    cy.get('.d-none',{ timeout: 50000 }).should('be.visible').and('contain','Log in with IDIR').click({force: true});
    cy.wait(3000);
    cy.get("div[class='form-element form-group'] input[name='user']").should('be.visible').type('DORGALE');
    cy.get("div[class='form-element form-group'] input[name='password']").should('be.visible').type(password);
    cy.get('.btn-primary').should('be.visible').click({force: true});
    cy.title().should('eq', 'Digital Privacy Impact Assessment (DPIA)').end();
  
    
  });

  it('Check BC Logo', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.on('uncaught:exception', (err, runnable) => {    
      return false
    });

    const password = Cypress.env('PASSWORD');

    cy.get('.d-none',{ timeout: 50000 }).should('be.visible').and('contain','Log in with IDIR').click({force: true});
    cy.wait(3000);
    cy.get("div[class='form-element form-group'] input[name='user']").should('be.visible').type('DORGALE');
    cy.get("div[class='form-element form-group'] input[name='password']").should('be.visible').type(password);
    cy.get('.btn-primary').should('be.visible').click({force: true});
    cy.get('img[class="logo"]').should('be.visible').end();
    
  });

  it('Check log out functionality', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.on('uncaught:exception', (err, runnable) => {    
      return false
    });

    const password = Cypress.env('PASSWORD');
    
    cy.get('.d-none',{ timeout: 50000 }).should('be.visible').and('contain','Log in with IDIR').click({force: true});
    cy.wait(3000);
    cy.get("div[class='form-element form-group'] input[name='user']").should('be.visible').type('DORGALE');
    cy.get("div[class='form-element form-group'] input[name='password']").should('be.visible').type(password);
    cy.get('.btn-primary').should('be.visible').click({force: true});
    cy.get('.d-md-block').should('be.visible').and('contain','Sign Out').click();
    cy.get("div[class='modal display-block '] button.bcgovbtn.bcgovbtn__primary",{ timeout: 20000 }).and('contain','Yes, sign out').focus().click({force: true}); //click({force: true}); //should('have.text',"Yes, sign out")
    cy.wait(4000);
    cy.get('.bcgovbtn',{ timeout: 50000 }).and('contain', 'Log in with IDIR').end();

    
  });

  it('Log in with Invalid username', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.on('uncaught:exception', (err, runnable) => {    
        return false
      });
    const password = Cypress.env('PASSWORD');

    cy.get('.d-none',{ timeout: 50000 }).should('be.visible').and('contain','Log in with IDIR').click({force: true});
    cy.wait(3000);
    cy.get("div[class='form-element form-group'] input[name='user']").should('be.visible').type('DORGALE1');
    cy.get("div[class='form-element form-group'] input[name='password']").should('be.visible').type(password);
    cy.get('.btn-primary').should('be.visible').click({force: true});
    cy.get("span[class='field-help-text']",{ timeout: 20000 }).should('be.visible').should('have.text',"The username or password you entered is incorrect").end();

    
  });

  it('Log in with Invalid password', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.on('uncaught:exception', (err, runnable) => {    
        return false
      });
    const password = Cypress.env('WRONGPASSWORD');

    cy.get('.d-none',{ timeout: 50000 }).should('be.visible').and('contain','Log in with IDIR').click({force: true});
    cy.wait(3000);
    cy.get("div[class='form-element form-group'] input[name='user']").should('be.visible').type('DORGALE');
    cy.get("div[class='form-element form-group'] input[name='password']").should('be.visible').type(password);
    cy.get('.btn-primary').should('be.visible').click({force: true});
    cy.get("span[class='field-help-text']",{ timeout: 20000 }).should('be.visible').should('have.text',"The username or password you entered is incorrect").end();

    
  });


});

export {};

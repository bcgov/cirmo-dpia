import Header from '../../../src/components/common/Header/Header';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';

describe('header.cy.tsx', () => {
  it('render header component with login', () => {
    cy.mount(
      <Router>
        <Header user={null} />
      </Router>,
    );
    cy.get("[data-cy='login']").contains('Log in with IDIR');
  });
  it('render header component with user name', () => {
    cy.mount(
      <Router>
        <Header user={'test@test.com'} />
      </Router>,
    );
    cy.get("[data-cy='login']").contains('Sign out');
  });
});

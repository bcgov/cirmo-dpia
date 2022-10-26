import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from '../../../../src/components/common/NavBar';
import { NavPages as pages } from '../../../../src/components/common/NavBar/navPages';
describe('NavBar.cy.tsx', () => {
  it('render ppq nav bar component with two links', () => {
    cy.mount(
      <Router>
        <NavBar pages={pages} />{' '}
      </Router>,
    );

    cy.get("[data-cy='nav-bar']").contains('Home');
    cy.get("[data-cy='nav-bar']").contains('PIA Pathway Questionnaire');
  });
});

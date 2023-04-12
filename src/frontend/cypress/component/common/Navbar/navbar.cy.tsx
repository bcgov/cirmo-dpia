/// <reference types="cypress" />
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from '../../../../src/components/common/Navbar';
import { NavPages as pages } from '../../../../src/components/common/Navbar/navPages';

describe('NavBar', () => {
  it('should render navigation items', () => {
    cy.mount(
      <Router>
        <NavBar pages={pages} CSSclass="navbar-container wrapper" />
      </Router>,
    );
    cy.get('nav').should('exist');
    cy.get('nav ul.navbar li').should('have.length', 2);
  });

  it('should render correct navigation labels', () => {
    cy.mount(
      <Router>
        <NavBar pages={pages} CSSclass="navbar-container wrapper" />
      </Router>,
    );
    cy.get('nav ul.navbar li').first().contains('List of PIAs');
    cy.get('nav ul.navbar li').last().contains('Create new');
  });

  it('should navigate to the correct page when a navigation link is clicked', () => {
    cy.mount(
      <Router>
        <NavBar pages={pages} CSSclass="navbar-container wrapper" />
      </Router>,
    );
    cy.get('nav ul.navbar li').find("a[href='/pia/list']").click();
    cy.location('pathname').should('eq', '/pia/list');
    cy.get('nav ul.navbar li').find("a[href='/ppq']").click();
    cy.location('pathname').should('eq', '/ppq');
  });

  it('should handle rovingTabIndex correctly', () => {
    cy.mount(
      <Router>
        <NavBar
          pages={pages}
          rovingTabIndex
          CSSclass="navbar-container wrapper"
        />
      </Router>,
    );
    cy.get('nav ul.navbar li')
      .find("a[href='/pia/list']")
      .should('have.attr', 'tabIndex', '0');
    cy.get('nav ul.navbar li ')
      .find("a[href='/ppq']")
      .should('have.attr', 'tabIndex', '-1');
  });
});

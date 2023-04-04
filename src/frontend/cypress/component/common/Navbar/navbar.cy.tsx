/// <reference types="cypress" />
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from '../../../../src/components/common/Navbar';
import { INavbarItem } from '../../../../src/components/common/Navbar/interfaces';
const pages: INavbarItem[] = [
  {
    id: 1,
    label: 'Home',
    link: '/',
    enable: true,
  },
  {
    id: 2,
    label: 'About',
    link: '/about',
    enable: true,
  },
];
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
    cy.get('nav ul.navbar li').first().contains('Home');
    cy.get('nav ul.navbar li').last().contains('About');
  });

  it('should set active class for the current path', () => {
    cy.window().then((win) => {
      win.history.pushState(null, '', '/');
    });

    cy.mount(
      <Router>
        <NavBar pages={pages} CSSclass="navbar-container wrapper" />
      </Router>,
    );
    cy.get('nav ul.navbar li #home').should('have.class', 'active');
  });

  it('should navigate to the correct page when a navigation link is clicked', () => {
    cy.mount(
      <Router>
        <NavBar pages={pages} CSSclass="navbar-container wrapper" />
      </Router>,
    );
    cy.get('nav ul.navbar li #about').click();
    cy.location('pathname').should('eq', '/about');
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
    cy.get('nav ul.navbar li #home').should('have.attr', 'tabindex', '0');
    cy.get('nav ul.navbar li #about').should('have.attr', 'tabindex', '-1');
  });
});

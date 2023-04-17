/// <reference types="cypress" />
import React from 'react';

import Callout from '../../../../src/components/common/Callout';

describe('Callout Component', () => {
  it('should render callout with text', () => {
    cy.mount(<Callout text="Sample callout text" />);

    cy.get('.callout-section')
      .find('.callout')
      .should('have.text', 'Sample callout text');
  });

  it('should render callout with bg-white class when bgWhite prop is true', () => {
    cy.mount(
      <Callout
        text="Sample callout text with white background"
        bgWhite={true}
      />,
    );

    cy.get('.callout-section')
      .find('.callout.bg-white')
      .should('have.text', 'Sample callout text with white background');
  });

  it('should render callout without bg-white class when bgWhite prop is false', () => {
    cy.mount(
      <Callout
        text="Sample callout text without white background"
        bgWhite={false}
      />,
    );

    cy.get('.callout-section')
      .find('.callout')
      .should('not.have.class', 'bg-white')
      .and('have.text', 'Sample callout text without white background');
  });
});

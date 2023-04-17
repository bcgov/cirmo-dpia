/// <reference types="cypress" />
import React from 'react';
import Card from '../../../../src/components/common/Card';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

describe('Card Component', () => {
  it('should render the card with icon, title, and text', () => {
    const title = 'Sample Card Title';
    const text = 'Sample Card Text';

    cy.mount(
      <Card icon={faCheck} title={title} text={text} id={0} button={false} />,
    );

    cy.get('.card-wrapper').within(() => {
      cy.get('.card-icon .fa-check');
      cy.get('.card-title').should('have.text', title);
      cy.get('.card-text').should('contain.text', text);
    });
  });

  it('should render the card with a button when the button prop is true', () => {
    const buttonText = 'Sample Button Text';
    const buttonUrl = '/sample-url';

    cy.mount(
      <Card
        icon={faCheck}
        title="Title"
        text="Text"
        button={true}
        buttonText={buttonText}
        buttonUrl={buttonUrl}
        id={0}
      />,
    );

    cy.get('.card-wrapper').within(() => {
      cy.get('.card-button.btn-secondary')
        .should('have.attr', 'href', buttonUrl)
        .and('have.text', buttonText);
    });
  });

  it('should render the card button with an icon when buttonIcon prop is provided', () => {
    cy.mount(
      <Card
        icon={faCheck}
        title="Title"
        text="Text"
        button={true}
        buttonText="Button Text"
        buttonIcon={faCheck}
        buttonUrl="/sample-url"
        id={0}
      />,
    );

    cy.get('.card-wrapper').within(() => {
      cy.get('.card-button .fa-check');
    });
  });
});

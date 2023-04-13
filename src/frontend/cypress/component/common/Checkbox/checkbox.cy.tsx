/// <reference types="cypress" />
import React from 'react';
import Checkbox from '../../../../src/components/common/Checkbox';

describe('Checkbox Component', () => {
  let handleChange;
  beforeEach(() => {
    handleChange = cy.stub();
  });
  it('should render the checkbox with the provided label', () => {
    const label = 'Sample Checkbox Label';

    cy.mount(
      <Checkbox
        label={label}
        value="sample"
        onChange={handleChange}
        checked={false}
      />,
    );

    cy.get('.checkbox-wrapper')
      .find('.input-label')
      .should('contain.text', label);
  });

  it('should render the checkbox as checked when the checked prop is true', () => {
    cy.mount(
      <Checkbox
        label="Checked Checkbox"
        value="checked"
        checked={true}
        onChange={handleChange}
      />,
    );

    cy.get('.checkbox-wrapper')
      .find('input[type="checkbox"]')
      .should('be.checked');
  });

  it('should render the checkbox with a link when the isLink prop is true', () => {
    const linkURL = '/sample-url';

    cy.mount(
      <Checkbox
        label="Checkbox with Link"
        value="link"
        isLink={true}
        linkURL={linkURL}
        onChange={handleChange}
        checked={false}
      />,
    );

    cy.get('.checkbox-wrapper')
      .find('.input-label a')
      .should('have.attr', 'href', linkURL)
      .and('contain.text', 'Checkbox with Link');
  });

  it('should render the checkbox with a tooltip when the tooltip prop is true', () => {
    const tooltipText = 'Sample Tooltip Text';

    cy.mount(
      <Checkbox
        label="Checkbox with Tooltip"
        value="tooltip"
        tooltip={true}
        tooltipText={tooltipText}
        onChange={handleChange}
        checked={false}
      />,
    );

    cy.get('.checkbox-wrapper').within(() => {
      cy.get('.cb-info-icon').click();
      cy.get('[data-id=tooltip]').should('contain.text', tooltipText);
    });
  });

  it('should call the onChange handler when the checkbox is clicked', () => {
    cy.mount(
      <Checkbox
        label="Checkbox with Handler"
        value="handler"
        onChange={handleChange}
        checked={false}
      />,
    );

    cy.get('.checkbox-wrapper')
      .find('input[type="checkbox"]')
      .click()
      .then(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions, jest/valid-expect
        expect(handleChange).to.be.called;
      });
  });
});

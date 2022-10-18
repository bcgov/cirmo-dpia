import PPQNavBar from '../../../src/components/common/PPQNavBar';

describe('PPQNavBar.cy.tsx', () => {
  it('render ppq nav bar component with two links', () => {
    cy.mount(<PPQNavBar />);
    cy.get("[data-cy='ppq-nav-bar']").contains('Home');
    cy.get("[data-cy='ppq-nav-bar']").contains('PIA Pathway Questionnaire');
  });
 
});
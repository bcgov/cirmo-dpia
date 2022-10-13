import Header from '../../../src/components/common/Header';

describe('header.cy.tsx', () => {
  it('render header component with login', () => {
    cy.mount(<Header />);
    cy.get("[data-cy='login']").contains('Log in with IDIR');
  });
  it('render header component with user name', () => {
    cy.mount(<Header user={'test@test.com'} />);
    cy.get("[data-cy='login']").contains('test@test.com');
  });
});

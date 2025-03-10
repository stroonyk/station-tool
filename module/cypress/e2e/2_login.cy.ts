describe('Testing UI Login', () => {
  it('login page successfully loads', () => {
    cy.visit('/'); // change URL to match your dev URL
    cy.url().should('include', 'accounts.api.2ra.co.uk');
    cy.getCookie('sessionToken').should('not.exist');
    cy.getCookie('session_token').should('not.exist');
    cy.getCookie('session_login').should('not.exist');
  });
  // beforeEach(() => {
  it('successfully logs in', () => {
    cy.beforeTest('testuesr@rradar.com.dev', 'D1gD0gDump!', `/`);
    cy.getCookie('sessionToken').should('exist');
    const baseUrl = Cypress.config('baseUrl');
    cy.url().should('include', baseUrl);
  });
});

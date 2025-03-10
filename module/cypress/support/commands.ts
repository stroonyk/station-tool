/// <reference types="cypress" />

Cypress.Commands.add('login', (username: string, password: string) => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  cy.session(
    // Stores cookie once logged in
    [username, password],
    () => {
      cy.visit('.');
      cy.get('input').type(username);
      cy.get('.primary-button').click();
      cy.get('#password').type(password);
      cy.get('.primary-button').click();
    },
    { cacheAcrossSpecs: true }
  );
});

Cypress.Commands.add('beforeTest', (username, password, pathname) => {
  cy.login(username, password); // Call login here so we never need to actually use login command
  cy.visit(pathname);
  // We wait here, so that the page has loaded before we try and access or assert anything
  cy.wait(2000);
});

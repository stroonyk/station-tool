declare module '@rradar/station-tool';
declare module '@rradar/core/dist/SiteHeader';
declare module '@rradar/core/dist/ToastContainer';
declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(username: string, password: string): Chainable<any>;
    beforeTest(
      username: string,
      password: string,
      pathname: string
    ): Chainable<any>;
  }
}

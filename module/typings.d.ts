declare module '*.svg' {
  const content: any;
  export default content;
}
declare module 'react-modal';
declare module '@rradar/station-tool';

declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(username: string, password: string): Chainable<any>;
    beforeTest(username: string, password: string, pathname: string): Chainable<any>;
  }
}

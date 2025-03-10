import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:40420',
    // specPattern: "**/e2e/**/*_spec.ts",
    // video: false,
    // videosFolder: "cypress/videos",
    // screenshotsFolder: "cypress/screenshots",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

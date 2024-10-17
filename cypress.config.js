const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
   setupNodeEvents(on, config) {
    // implement node event listeners here
    },
    testIsolation: false,
    // redirectionLimit: 50

    
    // chromeWebSecurity: true
    
  },
});
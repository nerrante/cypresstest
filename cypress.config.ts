import { defineConfig } from 'cypress'
const cypressSplit = require('cypress-split')

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    experimentalInteractiveRunEvents: true,
    reporter: 'cypress-multi-reporters',
    retries: {
      runMode: 1,
    },
    trashAssetsBeforeRuns: false,
    video: false,
    watchForFileChanges: false,
    baseUrl: 'https://www.saucedemo.com/',
    reporterOptions: {
      reporterEnabled: 'mochawesome, mocha-junit-reporter',
      mochawesomeReporterOptions: {
        useInlineDiffs: true,
        embeddedScreenshots: true,
        reportDir: 'cypress/results',
        reportFilename: '[name].html',
        overwrite: true,
        html: false,
        json: true,
        code: false
      },
    },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    //https://blog.hao.dev/fixing-cypress-errors-part-1-chromium-out-of-memory-crashes
    numTestsKeptInMemory: 0,
    env: {
      grepFilterSpecs: true,
      grepOmitFiltered: true,
      showLogs: true,
      numTestsKeptInMemory: 0,
    },
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome' && browser.isHeadless) {
          launchOptions.args.push('--disable-gpu');
          launchOptions.args.push('--disable-gpu-sandbox');
          launchOptions.args.push("--incognito");
          //https://blog.hao.dev/fixing-cypress-errors-part-1-chromium-out-of-memory-crashes
          launchOptions.args.push('--disable-dev-shm-usage');
        }
        return launchOptions
      });
      require('@bahmutov/cy-grep/src/plugin')(config);
      // https://github.com/bahmutov/cypress-failed-log
      require('cypress-failed-log/on')(on);
      cypressSplit(on, config)
      return config;
    }
  }
})

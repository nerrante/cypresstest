import { defineConfig } from 'cypress'

const baseConfig = require('../cypress.config.ts').e2e
const _ = require('lodash.merge')

const currentConfig = {
  env: {
    grepFilterSpecs: true,
    grepOmitFiltered: true,
    grepTags: '@regression',
  },
}

module.exports = defineConfig({
  e2e: _(baseConfig, currentConfig),
})
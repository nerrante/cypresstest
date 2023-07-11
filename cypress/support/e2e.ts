// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// https://github.com/dmtrKovalenko/cypress-real-events;
import 'cypress-real-events/support'

// "import" with `@ts-ignore`
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import registerCypressGrep from '@bahmutov/cy-grep'
registerCypressGrep()

// https://github.com/filiphric/cypress-plugin-api
import 'cypress-plugin-api'
import addContext from 'mochawesome/addContext'



// Alternatively you can use CommonJS syntax:
// require('./commands')
require('cypress-failed-log')

Cypress.Keyboard.defaults({
  keystrokeDelay: 20,
})

Cypress.Screenshot.defaults({
  onAfterScreenshot($el, props) {
    Cypress.env('currentRetry', props.testAttemptIndex)
  },
})

const titleToFileName = (title:string) =>
    title.replace(/[:\/]/g, '')

Cypress.on('test:after:run', (test, runnable) => {
    if (test.state === 'failed') {
        let parent = runnable.parent
        let filename = ''
        while (parent && parent.title) {
            filename = `${titleToFileName(
                parent.title,
            )} -- ${filename}`
            parent = parent.parent
        }
        filename += `${titleToFileName(
            test.title,
        )} (failed).png`
        addContext(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            { test },
            `../screenshots/${Cypress.spec.name}/${filename}`,
        )
        addContext(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            { test },
            {
                title: 'current retry number',
                value: Cypress.env('currentRetry'),
            },
        )
    }

})
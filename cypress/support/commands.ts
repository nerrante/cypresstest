import 'cypress-iframe'
import 'cypress-file-upload'
import '@testing-library/cypress/add-commands'

Cypress.Commands.overwrite('log', (subject, message) => cy.task('log', message))

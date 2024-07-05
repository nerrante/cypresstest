describe('Failing test', { tags: ['@not'] }, function () {
    context('Testing code', function () {
        it(`Does something good`,function () {
            cy.visit('/')
            cy.get('#user-name').type('locked_out_user')
            cy.get('#password').type('secret_sauce')
            cy.findByRole('button', {name: 'Login'}).click()
            cy.findByText('Products').should('exist')
        })
    })
})

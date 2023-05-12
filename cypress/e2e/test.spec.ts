describe('Test test', { tags: ['@regression'] }, function () {
    context('Testing code', { tags: ['@this'] }, function () {
        it(`Does something good`, { tags: ['@that'] },function () {
            cy.visit('/')
            cy.get('#user-name').type('standard_user')
            cy.get('#password').type('secret_sauce')
            cy.findByRole('button', {name: 'Login'}).click()
            cy.findByText('Products').should('exist')
        })
    })
})

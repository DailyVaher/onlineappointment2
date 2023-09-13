describe('The Login Page', () => {
    beforeEach(() => {

        // seed a user in the DB that we can control from our tests
        // assuming it generates a random password for us
        cy.request('POST', '/test/seed/user', { user: 'admin' })
            .its('body')
            .as('currentUser')
    })

    it('sets auth cookie when logging in via form submission', function () {
        // destructuring assignment of the this.currentUser object
        const { user, password } = this.user

        cy.visit('/login')

        cy.get('input[name=username]').type(user)

        // {enter} causes the form to submit
        cy.get('input[name=password]').type(`${password}{enter}`)

        // we should be redirected to /dashboard
        cy.url().should('include', '/dashboard')

        // our auth cookie should be present
        cy.getCookie('your-session-cookie').should('exist')

        // UI should reflect this user being logged in
        cy.get('h1').should('contain', 'admin')
    })
})

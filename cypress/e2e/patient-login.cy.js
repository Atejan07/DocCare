describe('Patient Login', () => {
  it('Should Navigate To Patient Login', () => {
    cy.visit('patient/login')
  })
  it('Should Fail When Wrong Credentials Are Passed', () => {
    cy.visit('patient/login')
    cy.get('#email').type('johndoe@gmail.com')
    cy.get('#email').should('have.value', 'johndoe@gmail.com')
    cy.get('#password').type('password')
    cy.get('#password').should('have.value', 'password')
    cy.get('#submit-login').click()
  })
  it('Should Login When Correct Credentials Are Passed', () => {
    cy.visit('patient/login')
    cy.get('#email').type('joemu.anderson@example.com')
    cy.get('#email').should('have.value', 'joemu.anderson@example.com')
    cy.get('#password').type('SecretPassw0rd!')
    cy.get('#password').should('have.value', 'SecretPassw0rd!')
    cy.get('#submit-login').click()
    setTimeout(() => {
      cy.url().should('include', 'dashboard')
    }, 2000)
  })
})
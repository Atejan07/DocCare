describe('Doctor Login', () => {
  it('Should Navigate To Doctor Login', () => {
    cy.visit('doctor/login')
  })
  it('Should Fail When Wrong Credentials Are Passed', () => {
    cy.visit('doctor/login')
    cy.get('#email').type('johndoe@gmail.com')
    cy.get('#email').should('have.value', 'johndoe@gmail.com')
    cy.get('#password').type('password')
    cy.get('#password').should('have.value', 'password')
    cy.get('#submit-login').click()
  })
  it('Should Login When Correct Credentials Are Passed', () => {
    cy.visit('doctor/login')
    cy.get('#email').type('olive.johnson@example.com')
    cy.get('#email').should('have.value', 'olive.johnson@example.com')
    cy.get('#password').type('null')
    cy.get('#password').should('have.value', 'null')
    cy.get('#submit-login').click()
    setTimeout(() => {
      cy.url().should('include', 'dashboard')
    }, 2000)
  })
})
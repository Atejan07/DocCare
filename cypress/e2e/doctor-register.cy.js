describe('Doctor Login Form', () => {
  it('Should Render Doctor Login Form', () => {
    cy.visit('doctor/register')
  })
})

describe('Patient Registration Form', () => {
  it('Should Fill And Register With The Correct Information', () => {
    cy.visit('doctor/register')
    cy.get('#name').type('John Doe')
    cy.get('#name').should('have.value', 'John Doe')
    cy.get('#email').type('johndoe@gmail.com')
    cy.get('#email').should('have.value', 'johndoe@gmail.com')
    cy.get('#password').type('password')
    cy.get('#password').should('have.value', 'password')
    cy.get('#phoneNumber').type('+44 20 1234 5678')
    cy.get('#phoneNumber').should('have.value', '+44 20 1234 5678')
    cy.get('#address').type('123 Main Street')
    cy.get('#address').should('have.value', '123 Main Street')
    cy.get('#licenseNumber').type('1994-08-04')
    cy.get('#licenseNumber').should('have.value', '1994-08-04')
    cy.get('#male').click()
    cy.get('#male').should('be.checked')
    cy.get('#about').type('Im Fkin Awesome...')
    cy.get('#about').should('have.value', 'Im Fkin Awesome...')
    cy.get('#profilePicture').selectFile('client/public/imnotperfectimawesome.jpg', { subjectType: 'input' })
    cy.get('#profilePicture').should('have.value','C:\\fakepath\\imnotperfectimawesome.jpg', { subjectType: 'input' })
    cy.get('#specialisation12').click()
    cy.get('#specialisation12').should('be.checked')
    cy.get('#submit-register').click()
  })
})
import MockRouter from '../fixtures/MockRouter';
import Login from '@/app/(components)/login';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import 'cypress-localstorage-commands';

describe('<Login>', () => {
  beforeEach(() => {
    cy.mount(
      <MockRouter asPath='/doctor/login'>
        <Provider store={store}>
          <Login user={'doctor'} />
        </Provider>
      </MockRouter>
    );
  });
  it('should display the login form', () => {
    cy.get('h2').should('contain', 'Login');
    cy.get('form').should('exist');
    cy.get('form input[name="email"]').should('exist');
    cy.get('form input[name="password"]').should('exist');
    cy.get('form button[type="submit"]').should('exist');
  });
  // it('should display an error message for invalid login', () => {
  //   const invalidEmail = 'invalid-email@example.com';
  //   const invalidPassword = 'wrong-password';
  //   cy.get('form input[name="email"]').type(invalidEmail);
  //   cy.get('form input[name="email"]').should('have.value', invalidEmail);
  //   cy.get('form input[name="password"]').type(invalidPassword);
  //   cy.get('form input[name="password"]').should('have.value', invalidPassword);
  //   cy.get('form')
  //     .submit()
  //     .then(() => {
  //       cy.request('POST', 'localhost:3001/patient/login', {
  //         email: invalidEmail,
  //         password: invalidPassword,
  //         failOnStatusCode: false,
  //       }).then((res) => {
  //         console.log(res);
  //         expect(res.status).to.equal(403);
  //         expect(res.body.error).to.equal('Username or password not found');
  //       });
  //     });
  // });
  it('should redirect to the dashboard after successful login', () => {
    const validEmail = 'carol123@example.com';
    const validPassword = '123';
    cy.get('form input[name="email"]').type(validEmail);
    cy.get('form input[name="email"]').should('have.value', validEmail);
    cy.get('form input[name="password"]').type(validPassword);
    cy.get('form input[name="password"]').should('have.value', validPassword);
    cy.get('form')
      .submit()
      .then(() => {
        cy.request('POST', 'http://localhost:3001/doctor/login', {
          email: validEmail,
          password: validPassword,
        }).then((res) => {
          console.log(res);
          cy.setLocalStorage('accessToken', res.body.result.acesssToken);
          cy.setLocalStorage(
            'userType',
            res.body.result.userAuthenticated.userType
          );
          setTimeout(() => {
            cy.location('pathname').should('eq', '/doctor/dashboard');
          }, 2000);
        });
      });
  });
});
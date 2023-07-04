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

  it('should redirect to the dashboard after successful login', () => {
    const validEmail = 'carol@example.com';
    const validPassword = '123';
    cy.get('form input[name="email"]').type(validEmail);
    cy.get('form input[name="email"]').should('have.value', validEmail);
    cy.get('form input[name="password"]').type(validPassword);
    cy.get('form input[name="password"]').should('have.value', validPassword);
    cy.get('form')
      .submit()
      .then(() => {
        cy.request('POST', 'localhost:3001/doctor/login', {
          email: validEmail,
          password: validPassword,
        }).then((res) => {
          window.localStorage.setItem('accessToken', res.body.result.acesssToken);
          window.localStorage.setItem(
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







